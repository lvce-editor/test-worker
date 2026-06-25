import { afterEach, expect, jest, test } from '@jest/globals'

const execute = jest.fn(async (_url: string, _platform: number, _assetDir: string) => undefined)

jest.unstable_mockModule('../src/parts/Test/Test.ts', () => ({
  execute,
}))

const { doHotReload } = await import('../src/parts/DoHotReload/DoHotReload.ts')

afterEach(() => {
  execute.mockClear()
  jest.restoreAllMocks()
})

test('doHotReload clears console and executes the test', async () => {
  const consoleClearSpy = jest.spyOn(console, 'clear').mockImplementation(() => {})

  await doHotReload('http://localhost:3000/test.js', 1, 'memfs://assets')

  expect(consoleClearSpy).toHaveBeenCalledTimes(1)
  expect(execute).toHaveBeenCalledWith('http://localhost:3000/test.js', 1, 'memfs://assets')
})
