import { expect, test, describe } from '@jest/globals'
import { createUrlWithQueryParameter } from '../src/parts/CreateUrlWithQueryParameter/CreateUrlWithQueryParameter.ts'

const mockLocationHref = 'http://localhost:3000'

describe('createUrlWithQueryParameter', () => {
  test('adds time query parameter to URL', () => {
    const url = 'http://example.com'
    const time = Date.now()
    const result = createUrlWithQueryParameter(url, mockLocationHref, time)

    expect(result).toContain('http://example.com')
    expect(result).toContain('time=')
    expect(result).toContain(`time=${time}`)
  })

  test('preserves existing URL structure', () => {
    const url = 'https://example.com/path/to/resource'
    const time = Date.now()
    const result = createUrlWithQueryParameter(url, mockLocationHref, time)

    expect(result).toContain('https://example.com/path/to/resource')
    expect(result).toContain('time=')
    expect(result).toContain(`time=${time}`)
  })

  test('handles URLs with existing query parameters', () => {
    const url = 'http://example.com?existing=param'
    const time = Date.now()
    const result = createUrlWithQueryParameter(url, mockLocationHref, time)

    expect(result).toContain('existing=param')
    expect(result).toContain('time=')
    expect(result).toContain(`time=${time}`)
  })

  test('handles relative URLs', () => {
    const url = '/relative/path'
    const time = Date.now()
    const result = createUrlWithQueryParameter(url, mockLocationHref, time)

    expect(result).toContain('/relative/path')
    expect(result).toContain('time=')
    expect(result).toContain(`time=${time}`)
  })

  test('time parameter is numeric timestamp', () => {
    const url = 'http://example.com'
    const time = 1_234_567_890
    const result = createUrlWithQueryParameter(url, mockLocationHref, time)

    const urlObj = new URL(result)
    const timeParam = urlObj.searchParams.get('time')

    expect(timeParam).toBe('1234567890')
  })

  test('generates timestamps on subsequent calls', () => {
    const url = 'http://example.com'
    const time1 = 1_234_567_890
    const time2 = 1_234_567_891
    const result1 = createUrlWithQueryParameter(url, mockLocationHref, time1)
    const result2 = createUrlWithQueryParameter(url, mockLocationHref, time2)

    const urlObj1 = new URL(result1)
    const urlObj2 = new URL(result2)

    const timeParam1 = urlObj1.searchParams.get('time')
    const timeParam2 = urlObj2.searchParams.get('time')

    expect(timeParam1).toBe('1234567890')
    expect(timeParam2).toBe('1234567891')
  })

  test('handles empty string URL', () => {
    const url = ''
    const time = Date.now()
    const result = createUrlWithQueryParameter(url, mockLocationHref, time)

    expect(result).toContain('time=')
    expect(result).toContain(`time=${time}`)
  })

  test('handles URLs with fragments', () => {
    const url = 'http://example.com#section'
    const time = Date.now()
    const result = createUrlWithQueryParameter(url, mockLocationHref, time)

    expect(result).toContain('#section')
    expect(result).toContain('time=')
    expect(result).toContain(`time=${time}`)
  })
})
