import { expect, test } from '@jest/globals'
import * as BaseUrl from '../src/parts/TestFrameWorkComponentBaseUrl/TestFrameWorkComponentBaseUrl.ts'

test('getBaseUrl', () => {
  // @ts-ignore
  const { location } = globalThis
  // @ts-ignore
  delete globalThis.location
  // @ts-ignore
  globalThis.location = { origin: 'https://example.com' }

  const result: string = BaseUrl.getBaseUrl()
  expect(result).toBe('https://example.com/')

  // @ts-ignore
  globalThis.location = location
})


