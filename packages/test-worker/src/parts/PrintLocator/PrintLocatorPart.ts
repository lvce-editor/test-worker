import type { ParsedCssSelector } from '../ParseCssSelector/ParsedCssSelector.ts'

export const printLocatorPart = (part: ParsedCssSelector[number], hasPrefix: boolean): string => {
  switch (part.type) {
    case 1:
      return hasPrefix ? ` >> ${part.selector}` : part.selector
    case 3:
      return ` "${part.text}"`
    case 2:
      return hasPrefix ? ` text=${part.text}` : `text=${part.text}`
    default:
      return `:nth(${part.index})`
  }
}
