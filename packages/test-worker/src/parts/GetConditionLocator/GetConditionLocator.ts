import type { ILocatorInternal } from '../ILocatorInternal/ILocatorInternal.ts'
import type { ParsedCssSelector } from '../ParseCssSelector/ParseCssSelector.ts'
import * as ParsedSelectorType from '../ParsedSelectorType/ParsedSelectorType.ts'

interface WebViewLocator extends ILocatorInternal {
  readonly webViewId: string
}

type CompactParsedSelectorPart =
  | {
      readonly selector: string
      readonly type: typeof ParsedSelectorType.Css
    }
  | {
      readonly text: string
      readonly type: typeof ParsedSelectorType.Text
    }
  | {
      readonly text: string
      readonly type: typeof ParsedSelectorType.HasText
    }
  | {
      readonly index: number
      readonly type: typeof ParsedSelectorType.Nth
    }

type CompactParsedSelector = readonly CompactParsedSelectorPart[]

export type ConditionLocator = ILocatorInternal | CompactParsedSelector

const toCompactParsedSelector = (parsedSelector: ParsedCssSelector): CompactParsedSelector => {
  return parsedSelector.map((part) => {
    if (part.type === 'css') {
      return {
        selector: part.selector,
        type: ParsedSelectorType.Css,
      }
    }
    if (part.type === 'text') {
      return {
        text: part.text,
        type: ParsedSelectorType.Text,
      }
    }
    if (part.type === 'has-text') {
      return {
        text: part.text,
        type: ParsedSelectorType.HasText,
      }
    }
    return {
      index: part.index,
      type: ParsedSelectorType.Nth,
    }
  })
}

export const getConditionLocator = (locator: ILocatorInternal): ConditionLocator => {
  if ('webViewId' in locator && typeof (locator as WebViewLocator).webViewId === 'string') {
    return locator
  }
  return toCompactParsedSelector(locator._parsed)
}
