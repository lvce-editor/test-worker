import { test, expect } from '@jest/globals'
import * as GetKeyOptions from '../src/parts/GetKeyOptions/GetKeyOptions.ts'

test('key with control', () => {
  expect(GetKeyOptions.getKeyOptions('Control+a')).toEqual({
    altKey: false,
    ctrlKey: true,
    key: 'a',
    shiftKey: false,
  })
})

test('key with alt', () => {
  expect(GetKeyOptions.getKeyOptions('Alt+a')).toEqual({
    altKey: true,
    ctrlKey: false,
    key: 'a',
    shiftKey: false,
  })
})

test('key with space', () => {
  expect(GetKeyOptions.getKeyOptions('Control+Space')).toEqual({
    altKey: false,
    ctrlKey: true,
    key: ' ',
    shiftKey: false,
  })
})

test('key with shift', () => {
  expect(GetKeyOptions.getKeyOptions('Shift+Enter')).toEqual({
    altKey: false,
    ctrlKey: false,
    key: 'Enter',
    shiftKey: true,
  })
})

test('normal key', () => {
  expect(GetKeyOptions.getKeyOptions('a')).toEqual({
    altKey: false,
    ctrlKey: false,
    key: 'a',
    shiftKey: false,
  })
})
