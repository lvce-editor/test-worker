import { expect, test } from '@jest/globals'
import { toFileUrl } from '../src/parts/ToFileUrl/ToFileUrl.ts'

test('toFileUrl - http', () => {
  const url = 'http://localhost:3000/remote/test/file.txt'
  expect(toFileUrl(url)).toBe('file:///test/file.txt')
})

test('toFileUrl - https', () => {
  const url = 'https://example.com/remote/test/file.txt'
  expect(toFileUrl(url)).toBe('file:///test/file.txt')
})

test('toFileUrl - invalid remote url', () => {
  const url = 'http://localhost:3000/file.txt'
  expect(() => toFileUrl(url)).toThrow(new Error(`url must start with /remote`))
})

test('toFileUrl - invalid url', () => {
  const url = 'abc'

  // @ts-ignore
  const isBun = process.versions.bun
  const errorMessage = isBun ? `"abc" cannot be parsed as a URL.` : 'Invalid URL'
  expect(() => toFileUrl(url)).toThrow(new Error(errorMessage))
})
