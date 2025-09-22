import { expect, test } from '@jest/globals'
import type { FileMap } from '../src/parts/FileMap/FileMap.ts'
import { isValidFileMap } from '../src/parts/IsValidFileMap/IsValidFileMap.ts'

test('isValidFileMap - returns true for valid file map', () => {
  const validFileMap: FileMap = {
    'src/file1.ts': 'content1',
    'src/file2.ts': 'content2',
    'test/test1.test.ts': 'test content',
  }

  expect(isValidFileMap(validFileMap)).toBe(true)
})

test('isValidFileMap - returns true for empty file map', () => {
  const emptyFileMap: FileMap = {}

  expect(isValidFileMap(emptyFileMap)).toBe(true)
})

test('isValidFileMap - returns true for file map with special characters', () => {
  const fileMapWithSpecialChars: FileMap = {
    'src/file with spaces.ts': 'content with spaces',
    'src/file-with-dashes.ts': 'content with dashes',
    'src/file_with_underscores.ts': 'content with underscores',
    'src/file.with.dots.ts': 'content with dots',
    'src/中文文件名.ts': '中文内容',
  }

  expect(isValidFileMap(fileMapWithSpecialChars)).toBe(true)
})

test('isValidFileMap - returns true for file map with empty string values', () => {
  const fileMapWithEmptyValues: FileMap = {
    'src/empty.ts': '',
    'src/normal.ts': 'normal content',
  }

  expect(isValidFileMap(fileMapWithEmptyValues)).toBe(true)
})

test('isValidFileMap - returns true for file map with numeric keys (stringified)', () => {
  const fileMapWithNumericKeys = {
    '123': 'content',
    '456': 'more content',
  }

  expect(isValidFileMap(fileMapWithNumericKeys)).toBe(true)
})

test('isValidFileMap - returns false for null', () => {
  expect(isValidFileMap(null)).toBe(false)
})

test('isValidFileMap - returns false for undefined', () => {
  expect(isValidFileMap(undefined)).toBe(false)
})

test('isValidFileMap - returns false for number', () => {
  expect(isValidFileMap(42)).toBe(false)
})

test('isValidFileMap - returns false for string', () => {
  expect(isValidFileMap('not a file map')).toBe(false)
})

test('isValidFileMap - returns false for boolean', () => {
  expect(isValidFileMap(true)).toBe(false)
  expect(isValidFileMap(false)).toBe(false)
})

test('isValidFileMap - returns false for array', () => {
  expect(isValidFileMap([])).toBe(false)
  expect(isValidFileMap(['file1.ts', 'file2.ts'])).toBe(false)
})

test('isValidFileMap - returns false for object with non-string values', () => {
  const invalidFileMap = {
    'src/file1.ts': 123, // number instead of string
    'src/file2.ts': 'valid content',
  }

  expect(isValidFileMap(invalidFileMap)).toBe(false)
})

test('isValidFileMap - returns false for object with mixed value types', () => {
  const invalidFileMap = {
    'src/file1.ts': 'valid content',
    'src/file2.ts': true, // boolean instead of string
    'src/file3.ts': null, // null instead of string
  }

  expect(isValidFileMap(invalidFileMap)).toBe(false)
})

test('isValidFileMap - returns false for object with array values', () => {
  const invalidFileMap = {
    'src/file1.ts': ['content1', 'content2'], // array instead of string
    'src/file2.ts': 'valid content',
  }

  expect(isValidFileMap(invalidFileMap)).toBe(false)
})

test('isValidFileMap - returns false for object with object values', () => {
  const invalidFileMap = {
    'src/file1.ts': { content: 'nested' }, // object instead of string
    'src/file2.ts': 'valid content',
  }

  expect(isValidFileMap(invalidFileMap)).toBe(false)
})

const func = (): string => 'content'

test('isValidFileMap - returns false for function', () => {
  expect(isValidFileMap(func)).toBe(false)
})

test('isValidFileMap - type guard works correctly', () => {
  const value: unknown = {
    'src/file1.ts': 'content1',
    'src/file2.ts': 'content2',
  }

  expect(isValidFileMap(value)).toBe(true)
})

test('isValidFileMap - type guard correctly rejects invalid types', () => {
  const value: unknown = {
    'src/file1.ts': 123, // invalid
  }

  expect(isValidFileMap(value)).toBe(false)
})
