import { expect, test } from '@jest/globals'
import * as TestAssert from '../src/parts/TestAssert/TestAssert.ts'

test('string: ok', () => {
  TestAssert.string('a', 'msg')
})

test('string: throws', () => {
  expect(() => TestAssert.string(1 as any, 'message')).toThrow(new TypeError('message'))
})

test('number: ok', () => {
  TestAssert.number(1, 'msg')
})

test('number: throws', () => {
  expect(() => TestAssert.number('1' as any, 'message')).toThrow(new TypeError('message'))
})
