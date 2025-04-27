import { test, expect } from '@jest/globals'
import * as PrintLocator from '../src/parts/PrintLocator/PrintLocator.ts'

test('print locator with nth', () => {
  const locator = {
    _selector: 'button',
    _nth: 2,
    _hasText: '',
  }
  expect(PrintLocator.printLocator(locator)).toBe('button:nth(2)')
})

test('print locator with text', () => {
  const locator = {
    _selector: 'button',
    _nth: -1,
    _hasText: 'Submit',
  }
  expect(PrintLocator.printLocator(locator)).toBe('button "Submit"')
})

test('print locator with selector only', () => {
  const locator = {
    _selector: 'button',
    _nth: -1,
    _hasText: '',
  }
  expect(PrintLocator.printLocator(locator)).toBe('button')
})
