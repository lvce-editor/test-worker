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
