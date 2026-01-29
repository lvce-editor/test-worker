import { expect, test } from '@jest/globals'
import type * as TestInfoCache from '../src/parts/TestInfoCache/TestInfoCache.ts'
import { getHotReloadArgs } from '../src/parts/GetHotReloadArgs/GetHotReloadArgs.ts'

const mockLocationHref = 'http://localhost:3000'
const mockTime = 1_234_567_890

const createMockTestInfoItem = (overrides?: Partial<TestInfoCache.TestInfoItem>): TestInfoCache.TestInfoItem => ({
  assetDir: '/assets',
  inProgress: false,
  platform: 1,
  url: 'http://example.com/test.js',
  ...overrides,
})

test('returns shouldHotReload false when latestItem is undefined', () => {
  const result = getHotReloadArgs(undefined, mockLocationHref, mockTime)

  expect(result).toEqual({
    assetDir: '',
    platform: 0,
    shouldHotReload: false,
    url: '',
  })
})

test('returns shouldHotReload false when inProgress is true', () => {
  const latestItem = createMockTestInfoItem({ inProgress: true })
  const result = getHotReloadArgs(latestItem, mockLocationHref, mockTime)

  expect(result).toEqual({
    assetDir: '',
    platform: 0,
    shouldHotReload: false,
    url: '',
  })
})

test('returns shouldHotReload true when latestItem is valid and inProgress is false', () => {
  const latestItem = createMockTestInfoItem({
    assetDir: '/my-assets',
    inProgress: false,
    platform: 2,
    url: 'http://example.com/bundle.js',
  })

  const result = getHotReloadArgs(latestItem, mockLocationHref, mockTime)

  expect(result.shouldHotReload).toBe(true)
  expect(result.assetDir).toBe('/my-assets')
  expect(result.platform).toBe(2)
  expect(result.url).toContain('http://example.com/bundle.js')
  expect(result.url).toContain(`time=${mockTime}`)
})

test('adds time query parameter to URL', () => {
  const latestItem = createMockTestInfoItem({
    url: 'http://example.com/test.js',
  })
  const time = 9_876_543_210

  const result = getHotReloadArgs(latestItem, mockLocationHref, time)

  expect(result.url).toContain(`time=${time}`)
})

test('preserves assetDir from latestItem', () => {
  const assetDir = '/custom/assets/path'
  const latestItem = createMockTestInfoItem({ assetDir })

  const result = getHotReloadArgs(latestItem, mockLocationHref, mockTime)

  expect(result.assetDir).toBe(assetDir)
})

test('preserves platform from latestItem', () => {
  const platform = 5
  const latestItem = createMockTestInfoItem({ platform })

  const result = getHotReloadArgs(latestItem, mockLocationHref, mockTime)

  expect(result.platform).toBe(platform)
})

test('handles different URL formats', () => {
  const testCases = [
    'http://example.com/test.js',
    'https://example.com:8080/path/to/file.js',
    '/relative/path.js',
    'http://example.com/test.js?existing=param',
  ]

  for (const url of testCases) {
    const latestItem = createMockTestInfoItem({ url })

    const result = getHotReloadArgs(latestItem, mockLocationHref, mockTime)

    expect(result.url).toContain(url.split('?')[0])
    expect(result.url).toContain(`time=${mockTime}`)
    expect(result.shouldHotReload).toBe(true)
  }
})

test('handles empty assetDir', () => {
  const latestItem = createMockTestInfoItem({ assetDir: '' })

  const result = getHotReloadArgs(latestItem, mockLocationHref, mockTime)

  expect(result.assetDir).toBe('')
  expect(result.shouldHotReload).toBe(true)
})

test('handles platform 0', () => {
  const latestItem = createMockTestInfoItem({ platform: 0 })

  const result = getHotReloadArgs(latestItem, mockLocationHref, mockTime)

  expect(result.platform).toBe(0)
  expect(result.shouldHotReload).toBe(true)
})

test('uses locationHref for query parameter construction', () => {
  const latestItem = createMockTestInfoItem()
  const customLocationHref = 'http://custom-host:9000'

  const result = getHotReloadArgs(latestItem, customLocationHref, mockTime)

  expect(result.shouldHotReload).toBe(true)
  expect(result.url).toContain(`time=${mockTime}`)
})
