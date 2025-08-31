import { expect, test } from '@jest/globals'
import { areSelectionsEqual } from '../src/parts/AreSelectionsEqual/AreSelectionsEqual.ts'

test('areSelectionsEqual: equal arrays', () => {
  const a = new Uint32Array([1, 2, 3, 4])
  const b = new Uint32Array([1, 2, 3, 4])
  expect(areSelectionsEqual(a, b)).toBe(true)
})

test('areSelectionsEqual: different length', () => {
  const a = new Uint32Array([1, 2, 3])
  const b = new Uint32Array([1, 2, 3, 4])
  expect(areSelectionsEqual(a, b)).toBe(false)
})

test('areSelectionsEqual: same length but one different element', () => {
  const a = new Uint32Array([1, 2, 3, 4])
  const b = new Uint32Array([1, 2, 5, 4])
  expect(areSelectionsEqual(a, b)).toBe(false)
})

