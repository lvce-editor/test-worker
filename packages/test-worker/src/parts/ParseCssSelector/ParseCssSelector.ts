import { isCssSelector } from '../IsCssSelector/IsCssSelector.ts'

export type ParsedCssSelector =
  | {
      readonly text: string
      readonly type: 'text'
    }
  | {
      readonly selector: string
      readonly type: 'css'
    }
  | {
      readonly selector: string
      readonly text: string
      readonly type: 'css+text'
    }

export const parseCssSelector = (selector: string): ParsedCssSelector => {
  if (typeof selector !== 'string') {
    throw new TypeError('selector must be of type string')
  }
  if (selector.startsWith('text=')) {
    return {
      text: selector.slice('text='.length),
      type: 'text',
    }
  }
  if (selector.includes('text=')) {
    const index = selector.indexOf('text=')
    const cssSelector = selector.slice(0, index).trimEnd()
    if (!isCssSelector(cssSelector)) {
      throw new Error(`unsupported selector: ${selector}`)
    }
    return {
      selector: cssSelector,
      text: selector.slice(index + 'text='.length),
      type: 'css+text',
    }
  }
  if (isCssSelector(selector)) {
    return {
      selector,
      type: 'css',
    }
  }
  throw new Error(`unsupported selector: ${selector}`)
}
