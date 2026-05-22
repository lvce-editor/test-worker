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