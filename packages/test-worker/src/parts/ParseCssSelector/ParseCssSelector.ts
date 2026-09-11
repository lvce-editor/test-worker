import type { ParsedCssSelector } from './ParsedCssSelector.ts'
import { CssParsingError } from '../CssParsingError/CssParsingError.ts'
import { isCssSelector } from '../IsCssSelector/IsCssSelector.ts'
import * as SelectorType from '../SelectorType/SelectorType.ts'

export const parseCssSelector = (selector: string): ParsedCssSelector => {
  if (typeof selector !== 'string') {
    throw new TypeError('selector must be of type string')
  }
  const index = selector.indexOf('text=')
  if (index !== -1) {
    const textPart: ParsedCssSelector[number] = {
      text: selector.slice(index + 'text='.length),
      type: SelectorType.Text,
    }
    if (index === 0) {
      return [textPart]
    }
    const cssSelector = selector.slice(0, index).trimEnd()
    if (!isCssSelector(cssSelector)) {
      throw new CssParsingError(`unsupported selector: ${selector}`)
    }
    return [
      {
        selector: cssSelector,
        type: SelectorType.Css,
      },
      textPart,
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
