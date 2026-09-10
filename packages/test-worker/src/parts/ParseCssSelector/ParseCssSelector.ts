import type { ParsedCssSelector } from './ParsedCssSelector.ts'
import { CssParsingError } from '../CssParsingError/CssParsingError.ts'
import { isCssSelector } from '../IsCssSelector/IsCssSelector.ts'
import * as SelectorType from '../SelectorType/SelectorType.ts'

export const parseCssSelector = (selector: string): ParsedCssSelector => {
  if (typeof selector !== 'string') {
    throw new TypeError('selector must be of type string')
  }
  if (selector.startsWith('text=')) {
    return [
      {
        text: selector.slice('text='.length),
        type: SelectorType.Text,
      },
    ]
  }
  if (selector.includes('text=')) {
    const index = selector.indexOf('text=')
    const cssSelector = selector.slice(0, index).trimEnd()
    if (!isCssSelector(cssSelector)) {
      throw new CssParsingError(`unsupported selector: ${selector}`)
    }
    return [
      {
        selector: cssSelector,
        type: SelectorType.Css,
      },
      {
        text: selector.slice(index + 'text='.length),
        type: SelectorType.Text,
      },
    ]
  }
  if (isCssSelector(selector)) {
    return [
      {
        selector,
        type: SelectorType.Css,
      },
    ]
  }
  throw new CssParsingError(`unsupported selector: ${selector}`)
}
