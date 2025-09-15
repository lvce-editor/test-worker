import { execa } from 'execa'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { root } from './root.ts'

export const verifyE2eTypes = async (): Promise<void> => {
  const tempDir = join(root, '.tmp', 'e2e-type-verification')
  const generatedTypesPath = join(root, '.tmp', 'dist', 'dist', 'api.d.ts')

  // Create temporary directory
  await mkdir(tempDir, { recursive: true })

  // Create a simple test file that uses the generated types
  const testContent = `
import type { TestApi, Test } from './api.d.ts'

// Test that the generated types work correctly
const testApi: TestApi = {} as any

// Test that we can create a test function with the correct signature
const testFunction: Test = async (api) => {
  // Test Locator usage
  const locator = api.Locator('.test-selector')
  await locator.click({})
  await locator.hover()
  await locator.type('test text')

  // Test expect usage
  await api.expect(locator).toBeVisible()

  // Test About usage
  await api.About.show()

  // Test KeyBindingsEditor usage
  await api.KeyBindingsEditor.open()

  // Test TitleBarMenuBar usage
  await api.TitleBarMenuBar.focus()
  await api.TitleBarMenuBar.handleKeyArrowDown()
}

// Test that the types are properly exported
const _testApi: TestApi = testApi
const _testFunction: Test = testFunction
`

  // Copy the generated types to temp directory
  const generatedTypes = await readFile(generatedTypesPath, 'utf8')
  await writeFile(join(tempDir, 'api.d.ts'), generatedTypes)
  await writeFile(join(tempDir, 'test.ts'), testContent)

  // Create a simple tsconfig.json
  const tsconfig = {
    compilerOptions: {
      target: 'esnext',
      lib: ['esnext'],
      module: 'esnext',
      moduleResolution: 'node',
      skipLibCheck: true,
      noEmit: true,
      strict: true,
      noImplicitAny: false,
    },
    include: ['test.ts'],
  }

  await writeFile(join(tempDir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2))

  // Run TypeScript compiler to check for errors
  const { stdout, stderr, exitCode } = await execa('npx', ['tsc', '--noEmit'], {
    cwd: tempDir,
    reject: false,
  })

  if (exitCode !== 0) {
    console.error('TypeScript compilation failed:')
    console.error('STDOUT:', stdout)
    console.error('STDERR:', stderr)
    console.error('Working directory:', tempDir)
    console.error('Generated types path:', generatedTypesPath)
    throw new Error(`E2E type verification failed with exit code ${exitCode}`)
  }

  console.log('✅ E2E type verification passed - generated API types are valid and complete')
}
