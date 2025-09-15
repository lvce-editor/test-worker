import { execa } from 'execa'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { root } from './root.ts'

const RE_WORD = /\w+/

const getActualContent = (content: string): string => {
  // we want slightly different types,
  // specifically instead of exporting every interface
  // we only export a test api interface for tests

  const lines = content.split('\n')
  const newLines: string[] = []
  let state: 'default' | 'export' | 'after-export' = 'default'
  for (const line of lines) {
    switch (state) {
      case 'default':
        if (line.startsWith('export {')) {
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
          newLines.push('  readonly Locator: (selector: string, options?: any) => any')
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

export const generateApiTypes = async (): Promise<void> => {
  const ext = process.platform === 'win32' ? '' : ''
  const bundleGeneratorPath = join(root, 'packages', 'build', 'node_modules', '.bin', 'dts-bundle-generator' + ext)
  await execa(bundleGeneratorPath, ['-o', '../../.tmp/dist/dist/api.d.ts', 'src/parts/TestFrameWorkComponent/TestFrameWorkComponent.ts'], {
    cwd: join(root, 'packages', 'test-worker'),
    reject: false,
  })
<<<<<<< Updated upstream
  const content = await readFile(join(root, '.tmp', 'dist', 'dist', 'api.d.ts'), 'utf8')
  const actual = getActualContent(content)
=======
  await execa(bundleGeneratorPath, ['-o', '../../.tmp/api-types/expect.d.ts', 'src/parts/Expect/Expect.ts'], {
    cwd: join(root, 'packages', 'test-worker'),
    reject: false,
  })
  await execa(bundleGeneratorPath, ['-o', '../../.tmp/api-types/locator.d.ts', 'src/parts/Locator/Locator.ts'], {
    cwd: join(root, 'packages', 'test-worker'),
    reject: false,
  })
  const content = await readFile(join(root, '.tmp', 'api-types', 'api.d.ts'), 'utf8')
  const contentExpect = await readFile(join(root, '.tmp', 'api-types', 'expect.d.ts'), 'utf8')
  const contentLocator = await readFile(join(root, '.tmp', 'api-types', 'locator.d.ts'), 'utf8')
  const actual = getActualApiTypesContent(content, contentExpect, contentLocator)
>>>>>>> Stashed changes
  await writeFile(join(root, '.tmp', 'dist', 'dist', 'api.d.ts'), actual)
}
