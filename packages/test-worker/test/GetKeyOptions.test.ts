import { test, expect } from '@jest/globals'
import * as GetKeyOptions from '../src/parts/GetKeyOptions/GetKeyOptions.ts'

test('key with control', () => {
  expect(GetKeyOptions.getKeyOptions('Control+a')).toEqual({
    altKey: false,
    ctrlKey: true,
    key: 'a',
  })
})

test('key with alt', () => {
  expect(GetKeyOptions.getKeyOptions('Alt+a')).toEqual({
    altKey: true,
    ctrlKey: false,
    key: 'a',
  })
})

test('key with space', () => {
  expect(GetKeyOptions.getKeyOptions('Control+Space')).toEqual({
    altKey: false,
    ctrlKey: true,
    key: ' ',
  })
})

test('normal key', () => {
  expect(GetKeyOptions.getKeyOptions('a')).toEqual({
    altKey: false,
    ctrlKey: false,
    key: 'a',
  })
})
