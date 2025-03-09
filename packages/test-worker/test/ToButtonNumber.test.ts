import { test, expect } from '@jest/globals'
import * as ToButtonNumber from '../src/parts/ToButtonNumber/ToButtonNumber.ts'

test('left button', () => {
  expect(ToButtonNumber.toButtonNumber('left')).toBe(0)
})

test('middle button', () => {
  expect(ToButtonNumber.toButtonNumber('middle')).toBe(1)
})

test('right button', () => {
  expect(ToButtonNumber.toButtonNumber('right')).toBe(2)
})

test('invalid button type', () => {
  expect(() => ToButtonNumber.toButtonNumber('invalid')).toThrow('unsupported button type: invalid')
})
