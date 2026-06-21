/* eslint-disable unicorn/prefer-uint8array-base64 */
import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TestModule from '../src/parts/Test/Test.ts'
import * as TestInfoCache from '../src/parts/TestInfoCache/TestInfoCache.ts'
import * as TestState from '../src/parts/TestState/TestState.ts'

const passMessagePattern = /^test passed in /
const passInfoPattern = /^PASS pass-test in /
const allTestsMixedSummaryPattern = /^1 test passed, 1 test failed, 1 test skipped in /
const allTestsFailedSummaryPattern = /^1 test failed in /
const allTestsPassedSummaryPattern = /^2 tests passed in /

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
  const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})

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
  expect(consoleInfoSpy).toHaveBeenCalledTimes(1)
  expect(consoleInfoSpy).toHaveBeenCalledWith(expect.stringMatching(passInfoPattern))
  expect(TestState.getMockRpc('test-pass-rpc')).toBe(module.mockRpc)
  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.showOverlay', 'pass', 'green', expect.stringMatching(passMessagePattern)],
    ['Preferences.get', 'E2eTest.hotReload'],
  ])

  consoleInfoSpy.mockRestore()
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

test('executeAll runs tests and renders TestResults json', async () => {
  TestInfoCache.clear()
  const assetDir = 'memfs://assets'
  const passUrl = toDataUrl(`
export const test = async ({ BaseUrl }) => {
  if (BaseUrl.getBaseUrl() !== 'memfs://assets') {
    throw new Error('unexpected base url')
  }
}
`)
  const failUrl = toDataUrl(`
export const test = async () => {
  throw new Error('boom')
}
`)
  const skipUrl = toDataUrl(`
export const skip = true
export const test = async () => {}
`)
  const href = 'http://localhost:3000/tests/_all.html'

  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.showOverlay'() {
      return undefined
    },
    'TestFrameWork.showTestResults'() {
      return undefined
    },
  })

  await TestModule.executeAll(
    [
      { name: 'pass-test.js', url: passUrl },
      { name: 'fail-test.js', url: failUrl },
      { name: 'skip-test.js', url: skipUrl },
    ],
    href,
    1,
    assetDir,
  )

  expect(TestInfoCache.last()).toEqual({
    assetDir,
    inProgress: false,
    platform: 1,
    url: href,
  })
  expect(mockRpc.invocations).toHaveLength(2)
  expect(mockRpc.invocations[0]).toEqual(['TestFrameWork.showOverlay', 'fail', 'red', expect.stringMatching(allTestsMixedSummaryPattern)])
  expect(mockRpc.invocations[1]?.[0]).toBe('TestFrameWork.showTestResults')
  const results = JSON.parse(mockRpc.invocations[1]?.[1])
  expect(results).toMatchObject([
    {
      error: '',
      name: 'pass-test.js',
      status: 'pass',
    },
    {
      error: 'boom',
      name: 'fail-test.js',
      status: 'fail',
    },
    {
      error: '',
      name: 'skip-test.js',
      status: 'skip',
    },
  ])
})

test('executeAll reports import errors in TestResults json', async () => {
  TestInfoCache.clear()
  const assetDir = 'memfs://assets'
  const href = 'http://localhost:3000/tests/_all.html'
  const brokenUrl = toDataUrl(`
export const test = async () => {}
invalid syntax here
`)

  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.showOverlay'() {
      return undefined
    },
    'TestFrameWork.showTestResults'() {
      return undefined
    },
  })

  await TestModule.executeAll([{ name: 'broken-test.js', url: brokenUrl }], href, 1, assetDir)

  expect(mockRpc.invocations[0]).toEqual(['TestFrameWork.showOverlay', 'fail', 'red', expect.stringMatching(allTestsFailedSummaryPattern)])
  const results = JSON.parse(mockRpc.invocations[1]?.[1])
  expect(results).toHaveLength(1)
  expect(results[0]).toMatchObject({
    name: 'broken-test.js',
    status: 'fail',
  })
  expect(results[0].error).toContain('Failed to import test')
})

test('executeAll shows passed summary overlay', async () => {
  TestInfoCache.clear()
  const assetDir = 'memfs://assets'
  const href = 'http://localhost:3000/tests/_all.html'
  const passUrl = toDataUrl(`
export const test = async () => {}
`)

  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.showOverlay'() {
      return undefined
    },
    'TestFrameWork.showTestResults'() {
      return undefined
    },
  })

  await TestModule.executeAll(
    [
      { name: 'pass-1.js', url: passUrl },
      { name: 'pass-2.js', url: passUrl },
    ],
    href,
    1,
    assetDir,
  )

  expect(mockRpc.invocations[0]).toEqual(['TestFrameWork.showOverlay', 'pass', 'green', expect.stringMatching(allTestsPassedSummaryPattern)])
})
