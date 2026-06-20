import { expect, test } from '@jest/globals'
import { findClosingParenthesis } from '../src/parts/TryAutoFixFindClosingParenthesis/TryAutoFixFindClosingParenthesis.ts'

test('findClosingParenthesis ignores closing parentheses inside strings', () => {
  const value = "shouldHavePayload({ text: 'value ) still open' })"
  const startIndex = value.indexOf('(') + 1

  const closingParenthesisIndex = findClosingParenthesis(value, startIndex)

  expect(closingParenthesisIndex).toBe(value.length - 1)
})

test('findClosingParenthesis ignores closing parentheses inside comments', () => {
  const value = `shouldHavePayload({
  // ) comment only
  value: true,
})`
  const startIndex = value.indexOf('(') + 1

  const closingParenthesisIndex = findClosingParenthesis(value, startIndex)

  expect(closingParenthesisIndex).toBe(value.length - 1)
})

test('findClosingParenthesis ignores closing parentheses inside block comments', () => {
  const value = `shouldHavePayload({
  /* ) comment only */
  value: true,
})`
  const startIndex = value.indexOf('(') + 1

  const closingParenthesisIndex = findClosingParenthesis(value, startIndex)

  expect(closingParenthesisIndex).toBe(value.length - 1)
})

test('findClosingParenthesis handles nested parentheses', () => {
  const value = 'shouldHavePayload(call(() => true))'
  const startIndex = value.indexOf('(') + 1

  const closingParenthesisIndex = findClosingParenthesis(value, startIndex)

  expect(closingParenthesisIndex).toBe(value.length - 1)
})

test('findClosingParenthesis returns minus one when no closing parenthesis exists', () => {
  const value = 'shouldHavePayload(call(() => true)'
  const startIndex = value.indexOf('(') + 1

  const closingParenthesisIndex = findClosingParenthesis(value, startIndex)

  expect(closingParenthesisIndex).toBe(-1)
})

test('findClosingParenthesis ignores escaped string delimiters', () => {
  const value = `shouldHavePayload({ text: 'value \\' ) still open' })`
  const startIndex = value.indexOf('(') + 1

  const closingParenthesisIndex = findClosingParenthesis(value, startIndex)

  expect(closingParenthesisIndex).toBe(value.length - 1)
})

test('findClosingParenthesis treats non-comment slashes as regular characters', () => {
  const value = 'shouldHavePayload(a / b)'
  const startIndex = value.indexOf('(') + 1

  const closingParenthesisIndex = findClosingParenthesis(value, startIndex)

  expect(closingParenthesisIndex).toBe(value.length - 1)
})
