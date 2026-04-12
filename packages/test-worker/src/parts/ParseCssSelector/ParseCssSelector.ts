import type { ParsedCssSelector } from './ParsedCssSelector.ts'
import { CssParsingError } from '../CssParsingError/CssParsingError.ts'
import { isCssSelector } from '../IsCssSelector/IsCssSelector.ts'

export { type ParsedCssSelector } from './ParsedCssSelector.ts'

export const parseCssSelector = (selector: string): ParsedCssSelector => {
  if (typeof selector !== 'string') {
    throw new TypeError('selector must be of type string')
  }
  if (selector.startsWith('text=')) {
    return [
      {
        text: selector.slice('text='.length),
        type: 'text',
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
        type: 'css',
      },
      {
        text: selector.slice(index + 'text='.length),
        type: 'text',
      },
    ]
  }
  if (isCssSelector(selector)) {
    return [
      {
        selector,
        type: 'css',
      },
    ]
  }
  throw new CssParsingError(`unsupported selector: ${selector}`)
}
