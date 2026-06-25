import { afterEach, expect, jest, test } from '@jest/globals'
import type * as TestInfoCache from '../src/parts/TestInfoCache/TestInfoCache.ts'

const doHotReload = jest.fn(async (_url: string, _platform: number, _assetDir: string) => undefined)
const getHotReloadArgs = jest.fn((_lastItem: TestInfoCache.TestInfoItem | undefined, _locationHref: string, _time: number) => undefined as any)

jest.unstable_mockModule('../src/parts/DoHotReload/DoHotReload.ts', () => ({
  doHotReload,
}))

jest.unstable_mockModule('../src/parts/GetHotReloadArgs/GetHotReloadArgs.ts', () => ({
  getHotReloadArgs,
}))

const { hotReloadTest } = await import('../src/parts/HotReloadTest/HotReloadTest.ts')

const latestItem: TestInfoCache.TestInfoItem = {
  assetDir: 'memfs://assets',
  inProgress: false,
  platform: 1,
  url: 'http://localhost:3000/test.js',
}

afterEach(() => {
  doHotReload.mockClear()
  getHotReloadArgs.mockReset()
})

test('hotReloadTest returns early when hot reload should not run', async () => {
  getHotReloadArgs.mockReturnValue({
    assetDir: '',
    platform: 0,
    shouldHotReload: false,
    url: '',
  })

  await hotReloadTest(undefined, 'http://localhost:3000', 1234)

  expect(getHotReloadArgs).toHaveBeenCalledWith(undefined, 'http://localhost:3000', 1234)
  expect(doHotReload).not.toHaveBeenCalled()
})

test('hotReloadTest delegates to doHotReload when hot reload should run', async () => {
  getHotReloadArgs.mockReturnValue({
    assetDir: 'memfs://assets',
    platform: 2,
    shouldHotReload: true,
    url: 'http://localhost:3000/test.js?time=1234',
  })

  await hotReloadTest(latestItem, 'http://localhost:3000', 1234)

  expect(getHotReloadArgs).toHaveBeenCalledWith(latestItem, 'http://localhost:3000', 1234)
  expect(doHotReload).toHaveBeenCalledWith('http://localhost:3000/test.js?time=1234', 2, 'memfs://assets')
})
