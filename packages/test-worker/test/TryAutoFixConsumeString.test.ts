import { expect, test } from '@jest/globals'
import { consumeString } from '../src/parts/TryAutoFixConsumeString/TryAutoFixConsumeString.ts'

test('consumeString enters single quoted strings', () => {
  expect(consumeString('', "'")).toEqual({
    consumed: 1,
    stringDelimiter: "'",
  })
})

test('consumeString enters double quoted strings', () => {
  expect(consumeString('', '"')).toEqual({
    consumed: 1,
    stringDelimiter: '"',
  })
})

test('consumeString ignores non-string characters outside strings', () => {
  expect(consumeString('', 'a')).toEqual({
    consumed: 0,
    stringDelimiter: '',
  })
})

test('consumeString consumes escaped characters inside strings', () => {
  expect(consumeString("'", '\\')).toEqual({
    consumed: 2,
    stringDelimiter: "'",
  })
})

test('consumeString exits strings at the active delimiter', () => {
  expect(consumeString("'", "'")).toEqual({
    consumed: 1,
    stringDelimiter: '',
  })
})

test('consumeString consumes ordinary characters inside strings', () => {
  expect(consumeString("'", 'a')).toEqual({
    consumed: 1,
    stringDelimiter: "'",
  })
})
