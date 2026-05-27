import { expect, test } from '@jest/globals'
import { isAutoFixError } from '../src/parts/TryAutoFixIsAutoFixError/TryAutoFixIsAutoFixError.ts'
import { projectActualOntoExpected } from '../src/parts/TryAutoFixProjectActualOntoExpected/TryAutoFixProjectActualOntoExpected.ts'

test('isAutoFixError returns false for undefined values', () => {
  expect(isAutoFixError(undefined)).toBe(false)
})

test('isAutoFixError returns false for other autofix codes', () => {
  expect(
    isAutoFixError({
      code: 'different-error',
    } as any),
  ).toBe(false)
})

test('isAutoFixError returns true for should-have-payload errors', () => {
  expect(
    isAutoFixError({
      code: 'chat-debug.should-have-payload',
      expectedPayload: {},
    } as any),
  ).toBe(true)
})

test('projectActualOntoExpected returns non-array actual values unchanged when expected is an array', () => {
  expect(projectActualOntoExpected('value', ['x'])).toBe('value')
})

test('projectActualOntoExpected returns non-object actual values unchanged when expected is an object', () => {
  expect(projectActualOntoExpected('value', { id: true })).toBe('value')
})

test('projectActualOntoExpected keeps only overlapping structure from arrays and objects', () => {
  expect(
    projectActualOntoExpected(
      [
        { extra: 'ignore', id: 'a', keep: true },
        { id: 'b', keep: false },
      ],
      [{ id: '', keep: true }],
    ),
  ).toEqual([{ id: 'a', keep: true }])
})

test('projectActualOntoExpected skips expected object keys that are missing in actual payloads', () => {
  expect(
    projectActualOntoExpected(
      {
        present: {
          value: 1,
        },
      },
      {
        missing: true,
        present: {
          value: 0,
        },
      },
    ),
  ).toEqual({
    present: {
      value: 1,
    },
  })
})
