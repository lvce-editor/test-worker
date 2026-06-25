import { afterEach, expect, jest, test } from '@jest/globals'
import * as TestInfoCache from '../src/parts/TestInfoCache/TestInfoCache.ts'

const hotReloadTest = jest.fn(async (_lastItem: TestInfoCache.TestInfoItem | undefined, _locationHref: string, _time: number) => undefined)

jest.unstable_mockModule('../src/parts/HotReloadTest/HotReloadTest.ts', () => ({
  hotReloadTest,
}))

const { handleFileWatcherEvent } = await import('../src/parts/HandleFileWatcherEvent/HandleFileWatcherEvent.ts')

const setLocation = (href: string): (() => void) => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'location')
  Object.defineProperty(globalThis, 'location', {
    configurable: true,
    value: new URL(href),
  })
  return () => {
    if (originalDescriptor) {
      Object.defineProperty(globalThis, 'location', originalDescriptor)
      return
    }
    delete (globalThis as any).location
  }
}

afterEach(() => {
  hotReloadTest.mockClear()
  TestInfoCache.clear()
  jest.restoreAllMocks()
})

test('handleFileWatcherEvent passes latest test info, location href, and current time to hot reload', async () => {
  const restoreLocation = setLocation('http://localhost:3000/remote/test.js')
  jest.spyOn(Date, 'now').mockReturnValue(1234)
  const latestItem = {
    assetDir: 'memfs://assets',
    inProgress: false,
    platform: 1,
    url: 'http://localhost:3000/test.js',
  }
  TestInfoCache.push(latestItem)

  await handleFileWatcherEvent({ type: 'change' })

  expect(hotReloadTest).toHaveBeenCalledWith(latestItem, 'http://localhost:3000/remote/test.js', 1234)
  restoreLocation()
})
