import { test, expect } from '@jest/globals'
import * as ConditionErrors from '../src/parts/ConditionErrors/ConditionErrors.ts'
import { Locator } from '../src/parts/ConditionErrors/ConditionErrors.ts'

test('toBeVisible', () => {
  const locator: Locator = {
    _selector: '.button',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toBeVisible(locator)).toBe('expected selector to be visible .button')
})

test('toHaveValue', () => {
  const locator: Locator = {
    _selector: '.input',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toHaveValue(locator, { value: 'test' })).toBe('expected selector .input to have value test')
})

test('toHaveText - element not found', () => {
  const locator: Locator = {
    _selector: '.text',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toHaveText(locator, { text: 'hello' }, false, '')).toBe('expected selector .text to have text "hello" element was not found')
})

test('toHaveText - wrong text', () => {
  const locator: Locator = {
    _selector: '.text',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toHaveText(locator, { text: 'hello' }, true, 'world')).toBe('expected selector .text to have text "hello" but was "world"')
})

test('toHaveText - with nth selector', () => {
  const locator: Locator = {
    _selector: '.item',
    _nth: 2,
    _hasText: '',
  }
  expect(ConditionErrors.toHaveText(locator, { text: 'test' }, true, 'wrong')).toBe(
    'expected selector .item:nth(2) to have text "test" but was "wrong"',
  )
})

test('toHaveText - with hasText selector', () => {
  const locator: Locator = {
    _selector: '.item',
    _nth: -1,
    _hasText: 'hello',
  }
  expect(ConditionErrors.toHaveText(locator, { text: 'test' }, true, 'wrong')).toBe(
    'expected selector .item "hello" to have text "test" but was "wrong"',
  )
})

test('toHaveAttribute - element not found', () => {
  const locator: Locator = {
    _selector: '.link',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toHaveAttribute(locator, { key: 'href', value: '#' }, false, '')).toBe(
    'expected .link to have attribute href # but element was not found',
  )
})

test('toHaveAttribute - wrong value', () => {
  const locator: Locator = {
    _selector: '.link',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toHaveAttribute(locator, { key: 'href', value: '#' }, true, '/test')).toBe(
    'expected .link to have attribute href # but was /test',
  )
})

test('toHaveCount', () => {
  const locator: Locator = {
    _selector: '.items',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toHaveCount(locator, { count: 3 }, 1)).toBe('expected .items to have count 3 but was 1')
})

test('toBeFocused', () => {
  const locator: Locator = {
    _selector: '.input',
    _nth: -1,
    _hasText: '',
  }
  const activeElement = {
    tagName: 'BUTTON',
  }
  expect(ConditionErrors.toBeFocused(locator, activeElement, {})).toBe('expected .input to be focused but active element is BUTTON')
})

test('toBeFocused - with document.body', () => {
  const locator: Locator = {
    _selector: '.input',
    _nth: -1,
    _hasText: '',
  }
  const documentBody = {}
  expect(ConditionErrors.toBeFocused(locator, documentBody, documentBody)).toBe('expected .input to be focused but active element is document.body')
})

test('toBeHidden', () => {
  const locator: Locator = {
    _selector: '.modal',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toBeHidden(locator)).toBe('expected .modal to be hidden')
})

test('toHaveClass - element not found', () => {
  const locator: Locator = {
    _selector: '.button',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toHaveClass(locator, { className: 'active' }, false, '')).toBe(
    'expected .button to have class active but element was not found',
  )
})

test('toHaveClass - wrong class', () => {
  const locator: Locator = {
    _selector: '.button',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toHaveClass(locator, { className: 'active' }, true, '')).toBe('expected .button to have class active')
})

test('toHaveId - element not found', () => {
  const locator: Locator = {
    _selector: '.button',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toHaveId(locator, { id: 'submit' }, false, '')).toBe('expected .button to have id submit but element was not found')
})

test('toHaveId - wrong id', () => {
  const locator: Locator = {
    _selector: '.button',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toHaveId(locator, { id: 'submit' }, true, 'cancel')).toBe('expected .button to have id submit but was cancel')
})

test('toHaveCss - element not found', () => {
  const locator: Locator = {
    _selector: '.button',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toHaveCss(locator, { key: 'display', value: 'flex' }, false, '')).toBe(
    'expected .button to have css display flex but element was not found',
  )
})

test('toHaveCss - wrong value', () => {
  const locator: Locator = {
    _selector: '.button',
    _nth: -1,
    _hasText: '',
  }
  expect(ConditionErrors.toHaveCss(locator, { key: 'display', value: 'flex' }, true, 'block')).toBe(
    'expected .button to have css display flex but was block',
  )
})
