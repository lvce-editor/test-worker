import { test, expect } from '@jest/globals'
import type { ILocatorCreateOptions } from '../src/parts/ILocatorCreateOptions/ILocatorCreateOptions.ts'
import { createLocator } from '../src/parts/CreateLocator/CreateLocator.ts'

test('create locator with selector only', () => {
  const locator = createLocator('button')

  expect(locator._selector).toBe('button')
  expect(locator._nth).toBe(-1)
  expect(locator._hasText).toBe('')
})

test('create locator with selector and hasText option', () => {
  const options: ILocatorCreateOptions = {
    hasText: 'Submit',
  }
  const locator = createLocator('button', options)

  expect(locator._selector).toBe('button')
  expect(locator._nth).toBe(-1)
  expect(locator._hasText).toBe('Submit')
})

test('create locator with selector and nth option', () => {
  const options: ILocatorCreateOptions = {
    nth: 2,
  }
  const locator = createLocator('button', options)

  expect(locator._selector).toBe('button')
  expect(locator._nth).toBe(2)
  expect(locator._hasText).toBe('')
})

test('create locator with all options', () => {
  const options: ILocatorCreateOptions = {
    hasText: 'Submit',
    nth: 1,
  }
  const locator = createLocator('button', options)

  expect(locator._selector).toBe('button')
  expect(locator._nth).toBe(1)
  expect(locator._hasText).toBe('Submit')
})

test('create locator with empty options object', () => {
  const options: ILocatorCreateOptions = {}
  const locator = createLocator('button', options)

  expect(locator._selector).toBe('button')
  expect(locator._nth).toBe(-1)
  expect(locator._hasText).toBe('')
})

test('create locator returns instance with expected methods', () => {
  const locator = createLocator('button')

  expect(typeof locator.click).toBe('function')
  expect(typeof locator.hover).toBe('function')
  expect(typeof locator.first).toBe('function')
  expect(typeof locator.locator).toBe('function')
  expect(typeof locator.nth).toBe('function')
  expect(typeof locator.type).toBe('function')
  expect(typeof locator.dispatchEvent).toBe('function')
})
