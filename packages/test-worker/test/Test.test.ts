import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TestModule from '../src/parts/Test/Test.ts'
import * as TestInfoCache from '../src/parts/TestInfoCache/TestInfoCache.ts'
import * as TestState from '../src/parts/TestState/TestState.ts'

const passMessagePattern = /^test passed in /

const toDataUrl = (text: string): string => {
  return `data:text/javascript;base64,${Buffer.from(text).toString('base64')}`
}

test('execute runs test module and stores mock rpc', async () => {
  TestInfoCache.clear()
  const assetDir = 'memfs://assets'
  const scriptUrl = toDataUrl(`
export const name = 'pass-test'
export const mockRpc = { name: 'test-pass-rpc' }
export const test = async ({ BaseUrl }) => {
  if (BaseUrl.getBaseUrl() !== 'memfs://assets') {
    throw new Error('unexpected base url')
  }
}
`)
  const module = await import(scriptUrl)

  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get'() {
      return false
    },
    'TestFrameWork.showOverlay'() {
      return undefined
    },
  })

  await TestModule.execute(scriptUrl, 1, assetDir)

  expect(TestInfoCache.last()).toEqual({
    assetDir,
    inProgress: false,
    platform: 1,
    url: scriptUrl,
  })
  expect(TestState.getMockRpc('test-pass-rpc')).toBe(module.mockRpc)
  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.showOverlay', 'pass', 'green', expect.stringMatching(passMessagePattern)],
    ['Preferences.get', 'E2eTest.hotReload'],
  ])
})

test('execute skips skipped tests', async () => {
  TestInfoCache.clear()
  const assetDir = 'memfs://assets'
  const scriptUrl = toDataUrl(`
export const name = 'skip-test'
export const skip = true
export const test = async () => {}
`)

  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get'() {
      return false
    },
    'TestFrameWork.showOverlay'() {
      return undefined
    },
  })

  await TestModule.execute(scriptUrl, 2, assetDir)

  expect(TestInfoCache.last()).toEqual({
    assetDir,
    inProgress: false,
    platform: 2,
    url: scriptUrl,
  })
  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.showOverlay', 'skip', 'yellow', 'test skipped skip-test'],
    ['Preferences.get', 'E2eTest.hotReload'],
  ])
})

test('execute ignores hot reload lookup errors when module has no test', async () => {
  TestInfoCache.clear()
  const assetDir = 'memfs://assets'
  const scriptUrl = toDataUrl(`
export const name = 'no-test'
`)

  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get'() {
      throw new Error('failed to read preference')
    },
  })

  await expect(TestModule.execute(scriptUrl, 3, assetDir)).resolves.toBeUndefined()

  expect(TestInfoCache.last()).toEqual({
    assetDir,
    inProgress: false,
    platform: 3,
    url: scriptUrl,
  })
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'E2eTest.hotReload']])
})

test('execute handles import errors as failed tests', async () => {
  TestInfoCache.clear()
  const assetDir = 'memfs://assets'
  const scriptUrl = toDataUrl(`
export const name = 'broken-test'
export const test = async () => {}
invalid syntax here
`)

  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.showOverlay'() {
      return undefined
    },
  })
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

  await expect(TestModule.execute(scriptUrl, 4, assetDir)).resolves.toBeUndefined()

  expect(TestInfoCache.last()).toEqual({
    assetDir,
    inProgress: false,
    platform: 4,
    url: scriptUrl,
  })
  expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
  expect(consoleErrorSpy).toHaveBeenCalledWith(
    expect.objectContaining({
      message: expect.stringContaining('Failed to import test'),
    }),
  )
  expect(mockRpc.invocations).toEqual([['TestFrameWork.showOverlay', 'fail', 'red', expect.stringContaining('Failed to import test')]])

  consoleErrorSpy.mockRestore()
})
