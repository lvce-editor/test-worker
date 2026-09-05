import { expect, test } from '@jest/globals'
import type { ILocator } from '../src/parts/ILocator/ILocator.ts'
import { createLocator } from '../src/parts/CreateLocator/CreateLocator.ts'
import * as GetConditionLocator from '../src/parts/GetConditionLocator/GetConditionLocator.ts'

test('returns parsed locator for renderer conditions', () => {
  const locator = createLocator('form').locator('button').nth(2) as ILocator
  expect(GetConditionLocator.getConditionLocator(locator)).toBe(locator._parsed)
})

test('returns full locator for webview conditions', () => {
  const locator = createLocator('button') as any
  locator.webViewId = 'webview-1'
  expect(GetConditionLocator.getConditionLocator(locator)).toBe(locator)
})
