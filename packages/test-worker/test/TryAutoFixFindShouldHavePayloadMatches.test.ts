import { expect, test } from '@jest/globals'
import { findShouldHavePayloadMatches } from '../src/parts/TryAutoFixFindShouldHavePayloadMatches/TryAutoFixFindShouldHavePayloadMatches.ts'

test('findShouldHavePayloadMatches returns an empty array when there are no matches', () => {
  expect(findShouldHavePayloadMatches('await ChatDebug.shouldBeVisible()')).toEqual([])
})

test('findShouldHavePayloadMatches returns argument and source range for a match', () => {
  const value = 'await ChatDebug.shouldHavePayload({ value: true })'

  const matches = findShouldHavePayloadMatches(value)

  expect(matches).toEqual([
    {
      argument: '{ value: true }',
      index: value.indexOf('shouldHavePayload('),
      length: 'shouldHavePayload({ value: true })'.length,
    },
  ])
})

test('findShouldHavePayloadMatches returns multiple matches', () => {
  const value = `
await ChatDebug.shouldHavePayload({ id: 'first' })
await ChatDebug.shouldHavePayload({ id: 'second' })
`

  const matches = findShouldHavePayloadMatches(value)

  expect(matches.map((match) => match.argument)).toEqual(["{ id: 'first' }", "{ id: 'second' }"])
})

test('findShouldHavePayloadMatches stops when a match has no closing parenthesis', () => {
  const value = `
await ChatDebug.shouldHavePayload({ id: 'first' }
await ChatDebug.shouldHavePayload({ id: 'second' })
`

  const matches = findShouldHavePayloadMatches(value)

  expect(matches).toEqual([])
})

test('findShouldHavePayloadMatches ignores closing parentheses inside strings', () => {
  const value = "await ChatDebug.shouldHavePayload({ text: 'value ) still open' })"

  const matches = findShouldHavePayloadMatches(value)

  expect(matches).toEqual([
    {
      argument: "{ text: 'value ) still open' }",
      index: value.indexOf('shouldHavePayload('),
      length: "shouldHavePayload({ text: 'value ) still open' })".length,
    },
  ])
})
