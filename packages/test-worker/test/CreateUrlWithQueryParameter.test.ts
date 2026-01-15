import { expect, test, describe } from '@jest/globals'
import { createUrlWithQueryParameter } from '../src/parts/CreateUrlWithQueryParameter/CreateUrlWithQueryParameter.ts'

const mockLocationHref = 'http://localhost:3000'

describe('createUrlWithQueryParameter', () => {
  test('adds time query parameter to URL', () => {
    const url = 'http://example.com'
    const result = createUrlWithQueryParameter(url, mockLocationHref)

    expect(result).toContain('http://example.com')
    expect(result).toContain('time=')
  })

  test('preserves existing URL structure', () => {
    const url = 'https://example.com/path/to/resource'
    const result = createUrlWithQueryParameter(url, mockLocationHref)

    expect(result).toContain('https://example.com/path/to/resource')
    expect(result).toContain('time=')
  })

  test('handles URLs with existing query parameters', () => {
    const url = 'http://example.com?existing=param'
    const result = createUrlWithQueryParameter(url, mockLocationHref)

    expect(result).toContain('existing=param')
    expect(result).toContain('time=')
  })

  test('handles relative URLs', () => {
    const url = '/relative/path'
    const result = createUrlWithQueryParameter(url, mockLocationHref)

    expect(result).toContain('/relative/path')
    expect(result).toContain('time=')
  })

  test('time parameter is numeric timestamp', () => {
    const url = 'http://example.com'
    const result = createUrlWithQueryParameter(url, mockLocationHref)

    const urlObj = new URL(result)
    const timeParam = urlObj.searchParams.get('time')

    expect(timeParam).not.toBeNull()
    const timestamp = Number.parseInt(timeParam!, 10)
    expect(Number.isInteger(timestamp)).toBe(true)
    expect(timestamp).toBeGreaterThan(0)
  })

  test('generates timestamps on subsequent calls', () => {
    const url = 'http://example.com'
    const result1 = createUrlWithQueryParameter(url, mockLocationHref)
    const result2 = createUrlWithQueryParameter(url, mockLocationHref)

    const urlObj1 = new URL(result1)
    const urlObj2 = new URL(result2)

    const time1 = urlObj1.searchParams.get('time')
    const time2 = urlObj2.searchParams.get('time')

    expect(time1).not.toBeNull()
    expect(time2).not.toBeNull()

    const timestamp1 = Number.parseInt(time1!, 10)
    const timestamp2 = Number.parseInt(time2!, 10)

    expect(Number.isInteger(timestamp1)).toBe(true)
    expect(Number.isInteger(timestamp2)).toBe(true)
    expect(timestamp1).toBeGreaterThan(0)
    expect(timestamp2).toBeGreaterThan(0)
    expect(timestamp2).toBeGreaterThanOrEqual(timestamp1)
  })

  test('handles empty string URL', () => {
    const url = ''
    const result = createUrlWithQueryParameter(url, mockLocationHref)

    expect(result).toContain('time=')
  })

  test('handles URLs with fragments', () => {
    const url = 'http://example.com#section'
    const result = createUrlWithQueryParameter(url, mockLocationHref)

    expect(result).toContain('#section')
    expect(result).toContain('time=')
  })
})
