import { test, expect } from '@jest/globals'
import * as PrintLocator from '../src/parts/PrintLocator/PrintLocator.ts'

test('print locator with nth', () => {
  const locator = {
    _hasText: '',
    _nth: 2,
    _selector: 'button',
  }
  expect(PrintLocator.printLocator(locator)).toBe('button:nth(2)')
})

test('print locator with text', () => {
  const locator = {
    _hasText: 'Submit',
    _nth: -1,
    _selector: 'button',
  }
  expect(PrintLocator.printLocator(locator)).toBe('button "Submit"')
})

test('print locator with selector only', () => {
  const locator = {
    _hasText: '',
    _nth: -1,
    _selector: 'button',
  }
  expect(PrintLocator.printLocator(locator)).toBe('button')
})
