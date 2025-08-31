import { expect, test } from '@jest/globals'
import * as TestAssert from '../src/parts/TestAssert/TestAssert.ts'

test('string: ok', () => {
  expect(() => TestAssert.string('a', 'msg')).not.toThrow()
})

test('string: throws', () => {
  expect(() => TestAssert.string(1 as any, 'message')).toThrow(new TypeError('message'))
})

test('number: ok', () => {
  expect(() => TestAssert.number(1, 'msg')).not.toThrow()
})

test('number: throws', () => {
  expect(() => TestAssert.number('1' as any, 'message')).toThrow(new TypeError('message'))
})
