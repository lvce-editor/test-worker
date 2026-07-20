import type { ILocatorInternal } from '../ILocatorInternal/ILocatorInternal.ts'
import type { ParsedCssSelector } from '../ParseCssSelector/ParseCssSelector.ts'

interface WebViewLocator extends ILocatorInternal {
  readonly webViewId: string
}

export type ConditionLocator = ILocatorInternal | ParsedCssSelector

export const getConditionLocator = (locator: ILocatorInternal): ConditionLocator => {
  if ('webViewId' in locator && typeof (locator as WebViewLocator).webViewId === 'string') {
    return locator
  }
  return locator._parsed
}
