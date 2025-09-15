const RE_WORD = /\w+/

// we want slightly different types,
// specifically instead of exporting every interface
// we only export a test api interface for tests
export const getActualApiTypesContent = (contentApi: string, contentExpect: string, contentLocator: string): string => {
  const newLines: string[] = []
  let state: 'default' | 'export' | 'after-export' | 'internal' | 'skip' = 'default'

  const locatorLines = contentLocator.split('\n')
  state = 'default'
  for (const line of locatorLines) {
    if (line.startsWith('// Generated')) {
      continue
    }
    if (line.startsWith('export {}')) {
      continue
    }
    if (line.startsWith('export interface ILocatorInternal ')) {
      state = 'skip'
      continue
    }
    if (line.startsWith('export interface ILocator ')) {
      state = 'skip'
      continue
    }
    if (line.startsWith(`declare class Locator `)) {
      state = 'skip'
      continue
    }
    if (state === 'skip' && line === '}') {
      state = 'default'
      continue
    }
    if (state === 'skip') {
      continue
    }
    if (line.startsWith('export declare const create')) {
      newLines.push(`interface LocatorConstructor {
  (selector: string, option?: any): ILocatorExternal
}`)
      continue
    }
    if (line.startsWith('export interface')) {
      newLines.push(line.replace('export interface', 'interface'))
      continue
    }

    newLines.push(line)
  }

  const contentLines = contentApi.split('\n')
  state = 'default'
  for (const line of contentLines) {
    switch (state) {
      case 'default':
        if (line.startsWith('// Generated')) {
          break
        } else if (line.startsWith('export {')) {
          state = 'export'
          newLines.push('export interface TestApi {')
        } else {
          newLines.push(line)
        }
        break
      case 'export':
        if (line.startsWith('};')) {
          state = 'after-export'
          newLines.push('  readonly expect: any')
          newLines.push('  readonly Locator: (selector: string, option?: any) => ILocatorExternal')
          newLines.push('}')
          newLines.push('')
          newLines.push('export interface Test {')
          newLines.push('  (api: TestApi): Promise<void>')
          newLines.push('}')
        } else {
          const word = line.match(RE_WORD)
          if (word) {
            newLines.push(`  readonly ${word[0]}: typeof ${word[0]},`)
          }
        }
        break
      case 'after-export':
        break
      default:
        break
    }
  }
  newLines.push('\n')
  return newLines.join('\n')
}
