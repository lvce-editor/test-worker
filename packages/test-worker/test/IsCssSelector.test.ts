import { expect, test } from '@jest/globals'
import { isCssSelector } from '../src/parts/IsCssSelector/IsCssSelector.ts'

test('isCssSelector: returns false for empty selector', () => {
  expect(isCssSelector('')).toBe(false)
})

test.each([
  '.button',
  '#save',
  '[aria-label="Save"]',
  '*',
  ':root',
])('isCssSelector: returns true for prefix-based selector %s', (selector) => {
  expect(isCssSelector(selector)).toBe(true)
})

test.each([
  'button',
  'dialog',
  'article',
  'button.primary',
  'button:nth-of-type(3) span',
  'dialog[open]',
  'article > h1',
  'section button',
  'input[type="text"]',
])('isCssSelector: returns true for element-based selector %s', (selector) => {
  expect(isCssSelector(selector)).toBe(true)
})

test.each([
  ' ',
  'buttonish',
  'Button',
  '123',
  '-button',
  'custom-element',
  '/button',
  'text=Save',
  '😀',
])('isCssSelector: returns false for unsupported selector %s', (selector) => {
  expect(isCssSelector(selector)).toBe(false)
})
