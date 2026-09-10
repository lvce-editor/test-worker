import type { ParsedCssSelector } from '../ParseCssSelector/ParsedCssSelector.ts'

export const printLocatorPart = (part: ParsedCssSelector[number], hasPrefix: boolean): string => {
  switch (part.type) {
    case 'css':
      return hasPrefix ? ` >> ${part.selector}` : part.selector
    case 'text':
      return hasPrefix ? ` text=${part.text}` : `text=${part.text}`
    case 'has-text':
      return ` "${part.text}"`
    default:
      return `:nth(${part.index})`
  }
}
