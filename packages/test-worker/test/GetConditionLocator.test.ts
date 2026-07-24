import { expect, test } from '@jest/globals'
import type { ILocator } from '../src/parts/ILocator/ILocator.ts'
import { createLocator } from '../src/parts/CreateLocator/CreateLocator.ts'
import * as GetConditionLocator from '../src/parts/GetConditionLocator/GetConditionLocator.ts'

test('returns compact parsed locator for renderer conditions', () => {
  const locator = createLocator('form', { hasText: 'Settings' }).locator('button').nth(2) as ILocator
  expect(GetConditionLocator.getConditionLocator(locator)).toEqual([
    {
      selector: 'form',
      type: 1,
    },
    {
      text: 'Settings',
      type: 3,
    },
    {
      selector: 'button',
      type: 1,
    },
    {
      index: 2,
      type: 4,
    },
  ])
})

test('encodes text selector type', () => {
  const locator = createLocator('text=Save') as ILocator
  expect(GetConditionLocator.getConditionLocator(locator)).toEqual([
    {
      text: 'Save',
      type: 2,
    },
  ])
})

test('returns full locator for webview conditions', () => {
  const locator = createLocator('button') as any
  locator.webViewId = 'webview-1'
  expect(GetConditionLocator.getConditionLocator(locator)).toBe(locator)
})
