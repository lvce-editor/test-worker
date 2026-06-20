import { expect, test } from '@jest/globals'
import { consumeComment } from '../src/parts/TryAutoFixConsumeComment/TryAutoFixConsumeComment.ts'

test('consumeComment continues line comments until a newline', () => {
  expect(consumeComment(false, true, 'a', 'b')).toEqual({
    consumed: 1,
    inBlockComment: false,
    inLineComment: true,
  })
})

test('consumeComment exits line comments at a newline', () => {
  expect(consumeComment(false, true, '\n', 'a')).toEqual({
    consumed: 1,
    inBlockComment: false,
    inLineComment: false,
  })
})

test('consumeComment continues block comments until closing delimiter', () => {
  expect(consumeComment(true, false, 'a', 'b')).toEqual({
    consumed: 1,
    inBlockComment: true,
    inLineComment: false,
  })
})

test('consumeComment exits block comments at closing delimiter', () => {
  expect(consumeComment(true, false, '*', '/')).toEqual({
    consumed: 2,
    inBlockComment: false,
    inLineComment: false,
  })
})

test('consumeComment enters line comments', () => {
  expect(consumeComment(false, false, '/', '/')).toEqual({
    consumed: 2,
    inBlockComment: false,
    inLineComment: true,
  })
})

test('consumeComment enters block comments', () => {
  expect(consumeComment(false, false, '/', '*')).toEqual({
    consumed: 2,
    inBlockComment: true,
    inLineComment: false,
  })
})

test('consumeComment returns zero consumed characters outside comments', () => {
  expect(consumeComment(false, false, '/', 'a')).toEqual({
    consumed: 0,
    inBlockComment: false,
    inLineComment: false,
  })
})
