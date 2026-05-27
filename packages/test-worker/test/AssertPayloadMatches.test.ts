import { expect, test } from '@jest/globals'
import { assertPayloadMatches } from '../src/parts/AssertPayloadMatches/AssertPayloadMatches.ts'

test('assertPayloadMatches allows partial object matches', () => {
  expect(() =>
    assertPayloadMatches(
      {
        nested: {
          ignored: 'value',
          ok: true,
        },
      },
      {
        nested: {
          ok: true,
        },
      },
      'payload',
    ),
  ).not.toThrow()
})

test('assertPayloadMatches requires arrays for array expectations', () => {
  expect(() => assertPayloadMatches({}, [], 'payload')).toThrow(new TypeError('Expected payload to be an array but got {}'))
})

test('assertPayloadMatches requires enough array items', () => {
  expect(() => assertPayloadMatches([], [1], 'payload')).toThrow(new Error('Expected payload to have at least 1 items but got 0'))
})

test('assertPayloadMatches requires expected object keys', () => {
  expect(() => assertPayloadMatches({}, { ok: true }, 'payload')).toThrow(new Error('Expected payload.ok to exist'))
})

test('assertPayloadMatches requires objects for object expectations', () => {
  expect(() => assertPayloadMatches([], { ok: true }, 'payload')).toThrow(new TypeError('Expected payload to be an object but got []'))
})

test('assertPayloadMatches reports primitive mismatches with full path', () => {
  expect(() =>
    assertPayloadMatches(
      {
        items: [
          {
            id: 1,
          },
        ],
      },
      {
        items: [
          {
            id: 2,
          },
        ],
      },
      'payload',
    ),
  ).toThrow(new Error('Expected payload.items[0].id to equal 2 but got 1'))
})
