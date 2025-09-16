import { expect, test } from '@jest/globals'
import { getIsFirefox } from '../src/parts/IsFirefox/IsFirefox.ts'

const mockNavigator = (userAgent: string, userAgentData?: any): void => {
  Object.defineProperty(globalThis, 'navigator', {
    value: {
      userAgent,
      userAgentData,
    },
    writable: true,
    configurable: true,
  })
}

const clearNavigator = (): void => {
  // @ts-expect-error
  delete globalThis.navigator
}

test('returns false when navigator is undefined', () => {
  clearNavigator()

  const isFirefox = getIsFirefox()
  expect(isFirefox).toBe(false)
})

test('returns true when userAgent contains firefox (case insensitive)', () => {
  mockNavigator('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0')

  const isFirefox = getIsFirefox()
  expect(isFirefox).toBe(true)
})

test('returns true when userAgent contains FIREFOX (uppercase)', () => {
  mockNavigator('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 FIREFOX/91.0')

  const isFirefox = getIsFirefox()
  expect(isFirefox).toBe(true)
})

test('returns false when userAgent does not contain firefox', () => {
  mockNavigator('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')

  const isFirefox = getIsFirefox()
  expect(isFirefox).toBe(false)
})

test('returns true when userAgentData.brands includes Firefox', () => {
  mockNavigator('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', {
    brands: ['Not A;Brand', 'Chromium', 'Firefox'],
  })

  const isFirefox = getIsFirefox()
  expect(isFirefox).toBe(true)
})

test('returns false when userAgentData.brands does not include Firefox', () => {
  mockNavigator('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', {
    brands: ['Not A;Brand', 'Chromium', 'Google Chrome'],
  })

  const isFirefox = getIsFirefox()
  expect(isFirefox).toBe(false)
})

test('returns false when userAgentData.brands is empty', () => {
  mockNavigator('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', {
    brands: [],
  })

  const isFirefox = getIsFirefox()
  expect(isFirefox).toBe(false)
})

test('falls back to userAgent when userAgentData.brands is undefined', () => {
  mockNavigator('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0', {
    brands: undefined,
  })

  const isFirefox = getIsFirefox()
  expect(isFirefox).toBe(true)
})
