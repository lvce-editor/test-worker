import { test, expect } from '@jest/globals'
import type { ILocatorInternal } from '../src/parts/ILocatorInternal/ILocatorInternal.ts'
import { parseCssSelector } from '../src/parts/ParseCssSelector/ParseCssSelector.ts'
import * as PrintLocator from '../src/parts/PrintLocator/PrintLocator.ts'

const createLocator = (selector: string, { hasText = '', nth = -1 }: { readonly hasText?: string; readonly nth?: number } = {}): ILocatorInternal => {
  const parsed = parseCssSelector(selector)
  return {
    _parsed: [
      ...parsed,
      ...(hasText
        ? [
            {
              text: hasText,
              type: 'has-text' as const,
            },
          ]
        : []),
      ...(nth === -1
        ? []
        : [
            {
              index: nth,
              type: 'nth' as const,
            },
          ]),
    ],
    _selector: selector,
  }
}

const createParsedLocator = (parsed: ILocatorInternal['_parsed']): ILocatorInternal => {
  return {
    _parsed: parsed,
    _selector: '',
  }
}

test('print locator with nth', () => {
  const locator = createLocator('button', { nth: 2 })
  expect(PrintLocator.printLocator(locator)).toBe('button:nth(2)')
})

test('print locator with text', () => {
  const locator = createLocator('button', { hasText: 'Submit' })
  expect(PrintLocator.printLocator(locator)).toBe('button "Submit"')
})

test('print locator with selector only', () => {
  const locator = createLocator('button')
  expect(PrintLocator.printLocator(locator)).toBe('button')
})

test('print locator with text only', () => {
  const locator = createLocator('text=Submit')
  expect(PrintLocator.printLocator(locator)).toBe('text=Submit')
})

test('print locator with css and text', () => {
  const locator = createLocator('button text=Submit')
  expect(PrintLocator.printLocator(locator)).toBe('button text=Submit')
})

test('print locator with multiple css selectors', () => {
  const locator = createParsedLocator([
    {
      selector: 'form',
      type: 'css',
    },
    {
      selector: 'button',
      type: 'css',
    },
  ])
  expect(PrintLocator.printLocator(locator)).toBe('form >> button')
})

test('print locator with text has-text and nth', () => {
  const locator = createParsedLocator([
    {
      text: 'Submit',
      type: 'text',
    },
    {
      text: 'Now',
      type: 'has-text',
    },
    {
      index: 1,
      type: 'nth',
    },
  ])
  expect(PrintLocator.printLocator(locator)).toBe('text=Submit "Now":nth(1)')
})
