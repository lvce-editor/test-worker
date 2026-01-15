import { expect, test } from '@jest/globals'
import * as Timestamp from '../src/parts/Timestamp/Timestamp.ts'

test('now returns a number', () => {
  const value: number = Timestamp.now()
  expect(typeof value).toBe('number')
  expect(Number.isFinite(value)).toBe(true)
  expect(value).toBeGreaterThanOrEqual(0)
})

test('now returns increasing values', () => {
  const first = Timestamp.now()
  const second = Timestamp.now()

  expect(second).toBeGreaterThanOrEqual(first)
})
