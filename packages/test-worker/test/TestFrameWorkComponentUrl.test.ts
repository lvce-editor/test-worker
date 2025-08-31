import { expect, test } from '@jest/globals'
import * as Url from '../src/parts/TestFrameWorkComponentUrl/TestFrameWorkComponentUrl.ts'

test('resolve', () => {
  Url.setUrl('https://example.com/base/')
  const result: string = Url.resolve('path/file.txt')
  expect(result).toBe('https://example.com/base/path/file.txt')
})
