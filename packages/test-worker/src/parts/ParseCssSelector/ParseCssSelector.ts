import type { ParsedCssSelector } from './ParsedCssSelector.ts'
import { CssParsingError } from '../CssParsingError/CssParsingError.ts'
import { isCssSelector } from '../IsCssSelector/IsCssSelector.ts'

export const parseCssSelector = (selector: string): ParsedCssSelector => {
  if (typeof selector !== 'string') {
    throw new TypeError('selector must be of type string')
  }
  const index = selector.indexOf('text=')
  if (index !== -1) {
    const textPart: ParsedCssSelector[number] = {
      text: selector.slice(index + 'text='.length),
      type: 2,
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
        type: 1,
      },
      textPart,
    ]
  }
  if (isCssSelector(selector)) {
    return [
      {
        selector,
        type: 1,
      },
    ]
  }
  throw new CssParsingError(`unsupported selector: ${selector}`)
}
