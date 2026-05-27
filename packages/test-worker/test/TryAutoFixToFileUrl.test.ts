import { expect, test } from '@jest/globals'
import { toFileUrl } from '../src/parts/TryAutoFixToFileUrl/TryAutoFixToFileUrl.ts'

test('toFileUrl strips search and hash from file urls', () => {
  expect(toFileUrl('file:///workspace/test.ts?time=1#hash', 'http://localhost:3000')).toBe('file:///workspace/test.ts')
})

test('toFileUrl maps remote paths to file urls', () => {
  expect(toFileUrl('/remote/workspace/test.ts', 'http://localhost:3000')).toBe('file:///workspace/test.ts')
})

test('toFileUrl returns undefined for unsupported non-file urls', () => {
  expect(toFileUrl('/workspace/test.ts', 'http://localhost:3000')).toBeUndefined()
})
