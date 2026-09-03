import { expect, test } from '@jest/globals'
import * as StringifyString from '../src/parts/StringifyString/StringifyString.ts'

test('empty string', () => {
  expect(StringifyString.stringifyString('')).toBe('<empty string>')
})

test('non-empty string', () => {
  expect(StringifyString.stringifyString('test')).toBe('test')
})
