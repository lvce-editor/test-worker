import { execa } from 'execa'
import { readFile, writeFile } from 'node:fs/promises'
import path, { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const RE_WORD = /\w+/

const getActualContent = (content) => {
  const lines = content.split('\n')

  const newLines = []
  let state = 'default'
  for (const line of lines) {
    switch (state) {
      case 'default':
        if (line.startsWith('export')) {
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
          newLines.push(`  readonly ${word}: typeof ${word},`)
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

export const generateApiTypes = async () => {
  await execa('npx', ['dts-bundle-generator', '-o', 'dist/dist/api.d.ts', 'src/parts/TestFrameWorkComponent/TestFrameWorkComponent.ts'])
  const content = await readFile(join(root, 'dist', 'dist', 'api.d.ts'), 'utf8')
  const actual = getActualContent(content)
  await writeFile(join(root, 'dist', 'dist', 'api.d.ts'), actual)
}
