import { expect, test, jest } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TestInfoItem } from '../src/parts/TestInfoCache/TestInfoItem.ts'
import { hotReloadTest } from '../src/parts/HotReloadTest/HotReloadTest.ts'

test('hotReloadTest returns early when test info cache is empty', async () => {
  const clearConsoleSpy = jest.fn()

  await hotReloadTest({
    clearConsole: clearConsoleSpy,
    getLastTestInfoItem: (): TestInfoItem => {
      throw new Error('Should not be called')
    },
    hastTestInfoItems: (): boolean => false,
    locationHref: 'http://example.com',
    time: Date.now(),
  })

  expect(clearConsoleSpy).not.toHaveBeenCalled()
})

test('hotReloadTest returns early when test is in progress', async () => {
  const clearConsoleSpy = jest.fn()

  await hotReloadTest({
    clearConsole: clearConsoleSpy,
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir: '/assets',
      inProgress: true,
      platform: 1,
      url: 'http://example.com',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'http://example.com',
    time: Date.now(),
  })

  expect(clearConsoleSpy).not.toHaveBeenCalled()
})

test('hotReloadTest clears console when test info exists and not in progress', async () => {
  const clearConsoleSpy = jest.fn()

  using mockRpc = RendererWorker.registerMockRpc({
    'Test.execute'() {
      return undefined
    },
  })

  await hotReloadTest({
    clearConsole: clearConsoleSpy,
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir: '/assets',
      inProgress: false,
      platform: 1,
      url: 'http://example.com/test.ts',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'http://example.com',
    time: Date.now(),
  })

  expect(clearConsoleSpy).toHaveBeenCalledTimes(1)
  expect(mockRpc.invocations.length).toBeGreaterThanOrEqual(0)
})

test('hotReloadTest executes test when conditions are met', async () => {
  const clearConsoleSpy = jest.fn()

  using mockRpc = RendererWorker.registerMockRpc({
    'Test.execute'() {
      return undefined
    },
  })

  await hotReloadTest({
    clearConsole: clearConsoleSpy,
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir: '/assets',
      inProgress: false,
      platform: 1,
      url: 'http://example.com/test.ts',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'http://example.com',
    time: Date.now(),
  })

  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('hotReloadTest passes time as query parameter', async () => {
  const testTime = 1_234_567_890

  using mockRpc = RendererWorker.registerMockRpc({
    'Test.execute'(url: string) {
      expect(url).toContain('time=' + testTime)
      return undefined
    },
  })

  await hotReloadTest({
    clearConsole: jest.fn(),
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir: '/assets',
      inProgress: false,
      platform: 1,
      url: 'http://example.com/test.ts',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'http://example.com',
    time: testTime,
  })

  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('hotReloadTest passes correct asset directory', async () => {
  const assetDir = '/custom/assets'

  using mockRpc = RendererWorker.registerMockRpc({
    'Test.execute'(url: string, platform: number, assetDirArg: string) {
      expect(assetDirArg).toBe('/custom/assets')
      return undefined
    },
  })

  await hotReloadTest({
    clearConsole: jest.fn(),
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir,
      inProgress: false,
      platform: 1,
      url: 'http://example.com/test.ts',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'http://example.com',
    time: Date.now(),
  })

  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('hotReloadTest passes correct platform', async () => {
  const platform = 42

  using mockRpc = RendererWorker.registerMockRpc({
    'Test.execute'(url: string, platformArg: number) {
      expect(platformArg).toBe(42)
      return undefined
    },
  })

  await hotReloadTest({
    clearConsole: jest.fn(),
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir: '/assets',
      inProgress: false,
      platform,
      url: 'http://example.com/test.ts',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'http://example.com',
    time: Date.now(),
  })

  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('hotReloadTest with different URL schemes', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Test.execute'() {
      return undefined
    },
  })

  await hotReloadTest({
    clearConsole: jest.fn(),
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir: '/assets',
      inProgress: false,
      platform: 1,
      url: 'http://example.com/test.ts',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'https://secure.example.com/page',
    time: Date.now(),
  })

  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('hotReloadTest with complex URL with query parameters', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Test.execute'(url: string) {
      expect(typeof url).toBe('string')
      expect(url.length).toBeGreaterThan(0)
      return undefined
    },
  })

  await hotReloadTest({
    clearConsole: jest.fn(),
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir: '/assets',
      inProgress: false,
      platform: 1,
      url: 'http://example.com/test.ts?param1=value1&param2=value2',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'http://example.com',
    time: Date.now(),
  })

  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('hotReloadTest with multiple consecutive calls', async () => {
  const clearConsoleSpy = jest.fn()

  using mockRpc = RendererWorker.registerMockRpc({
    'Test.execute'() {
      return undefined
    },
  })

  // Call multiple times
  await hotReloadTest({
    clearConsole: clearConsoleSpy,
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir: '/assets',
      inProgress: false,
      platform: 1,
      url: 'http://example.com/test.ts',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'http://example.com',
    time: Date.now(),
  })

  await hotReloadTest({
    clearConsole: clearConsoleSpy,
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir: '/assets',
      inProgress: false,
      platform: 1,
      url: 'http://example.com/test.ts',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'http://example.com',
    time: Date.now() + 1000,
  })

  expect(clearConsoleSpy).toHaveBeenCalledTimes(2)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('hotReloadTest with platform 0', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Test.execute'(url: string, platform: number) {
      expect(platform).toBe(0)
      return undefined
    },
  })

  await hotReloadTest({
    clearConsole: jest.fn(),
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir: '/assets',
      inProgress: false,
      platform: 0,
      url: 'http://example.com/test.ts',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'http://example.com',
    time: Date.now(),
  })

  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('hotReloadTest with large time value', async () => {
  const largeTime = 9_999_999_999_999

  using mockRpc = RendererWorker.registerMockRpc({
    'Test.execute'(url: string) {
      expect(url).toContain('time=' + largeTime)
      return undefined
    },
  })

  await hotReloadTest({
    clearConsole: jest.fn(),
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir: '/assets',
      inProgress: false,
      platform: 1,
      url: 'http://example.com/test.ts',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'http://example.com',
    time: largeTime,
  })

  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('hotReloadTest with localhost URL', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Test.execute'() {
      return undefined
    },
  })

  await hotReloadTest({
    clearConsole: jest.fn(),
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir: '/assets',
      inProgress: false,
      platform: 1,
      url: 'http://localhost:3000/test.ts',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'http://localhost:3000',
    time: Date.now(),
  })

  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('hotReloadTest with file:// URL scheme', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Test.execute'() {
      return undefined
    },
  })

  await hotReloadTest({
    clearConsole: jest.fn(),
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir: '/assets',
      inProgress: false,
      platform: 1,
      url: 'file:///home/user/test.ts',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'file:///home/user',
    time: Date.now(),
  })

  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('hotReloadTest with empty asset directory', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Test.execute'() {
      return undefined
    },
  })

  await hotReloadTest({
    clearConsole: jest.fn(),
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir: '',
      inProgress: false,
      platform: 1,
      url: 'http://example.com/test.ts',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'http://example.com',
    time: Date.now(),
  })

  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('hotReloadTest preserves URL base before adding time parameter', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Test.execute'(url: string) {
      expect(url).toContain('example.com')
      expect(url).toContain('test.ts')
      return undefined
    },
  })

  await hotReloadTest({
    clearConsole: jest.fn(),
    getLastTestInfoItem: (): TestInfoItem => ({
      assetDir: '/assets',
      inProgress: false,
      platform: 1,
      url: 'http://example.com/test.ts',
    }),
    hastTestInfoItems: (): boolean => true,
    locationHref: 'http://example.com',
    time: 1000,
  })

  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})
