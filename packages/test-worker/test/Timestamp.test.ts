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

test('now returns reasonable timestamp values', () => {
  const value = Timestamp.now()

  // Should be a reasonable timestamp (not too old, not too far in future)
  const currentExpected = performance.now()
  expect(Math.abs(value - currentExpected)).toBeLessThan(1000) // Within 1 second
})

test('now is consistent across multiple calls', () => {
  const values = Array.from({ length: 10 }, () => Timestamp.now())

  // All should be numbers
  for (const value of values) {
    expect(typeof value).toBe('number')
    expect(Number.isFinite(value)).toBe(true)
    expect(value).toBeGreaterThanOrEqual(0)
  }

  // Should be non-decreasing
  for (let i = 1; i < values.length; i++) {
    expect(values[i]).toBeGreaterThanOrEqual(values[i - 1])
  }
})
