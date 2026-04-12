import { test, expect } from '@jest/globals'
import type { ILocatorCreateOptions } from '../src/parts/ILocatorCreateOptions/ILocatorCreateOptions.ts'
import { createLocator } from '../src/parts/CreateLocator/CreateLocator.ts'

test('create locator with selector only', () => {
  const locator = createLocator('button')

  expect(locator._selector).toBe('button')
  expect(locator._nth).toBe(-1)
  expect(locator._hasText).toBe('')
  expect(locator._parsed).toEqual({
    selector: 'button',
    type: 'css',
  })
})

test('create locator with selector and hasText option', () => {
  const options: ILocatorCreateOptions = {
    hasText: 'Submit',
  }
  const locator = createLocator('button', options)

  expect(locator._selector).toBe('button')
  expect(locator._nth).toBe(-1)
  expect(locator._hasText).toBe('Submit')
  expect(locator._parsed).toEqual({
    selector: 'button',
    type: 'css',
  })
})

test('create locator with selector and nth option', () => {
  const options: ILocatorCreateOptions = {
    nth: 2,
  }
  const locator = createLocator('button', options)

  expect(locator._selector).toBe('button')
  expect(locator._nth).toBe(2)
  expect(locator._hasText).toBe('')
  expect(locator._parsed).toEqual({
    selector: 'button',
    type: 'css',
  })
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
  expect(locator._parsed).toEqual({
    selector: 'button',
    type: 'css',
  })
})

test('create locator with empty options object', () => {
  const options: ILocatorCreateOptions = {}
  const locator = createLocator('button', options)

  expect(locator._selector).toBe('button')
  expect(locator._nth).toBe(-1)
  expect(locator._hasText).toBe('')
  expect(locator._parsed).toEqual({
    selector: 'button',
    type: 'css',
  })
})

test('create locator parses combined css and text selector', () => {
  const locator = createLocator('.button text=Save')

  expect(locator._parsed).toEqual({
    selector: '.button',
    text: 'Save',
    type: 'css+text',
  })
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

test('create locator throws for non-string selector', () => {
  expect(() => createLocator(42 as any)).toThrow(new TypeError('selector must be of type string'))
})

test('create locator throws for non-object options', () => {
  expect(() => createLocator('button', null as any)).toThrow(new TypeError('options must be of type object'))
})

test('create locator throws for non-string hasText', () => {
  expect(() => createLocator('button', { hasText: 42 as any })).toThrow(new TypeError('options.hasText must be of type string'))
})

test('create locator throws for non-number nth', () => {
  expect(() => createLocator('button', { nth: '1' as any })).toThrow(new TypeError('options.nth must be of type number'))
})
