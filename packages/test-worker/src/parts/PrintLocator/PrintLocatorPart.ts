import type { ParsedCssSelector } from '../ParseCssSelector/ParsedCssSelector.ts'
import * as SelectorType from '../SelectorType/SelectorType.ts'

export const printLocatorPart = (part: ParsedCssSelector[number], hasPrefix: boolean): string => {
  switch (part.type) {
    case SelectorType.Css:
      return hasPrefix ? ` >> ${part.selector}` : part.selector
    case SelectorType.HasText:
      return ` "${part.text}"`
    case SelectorType.Text:
      return hasPrefix ? ` text=${part.text}` : `text=${part.text}`
    default:
      return `:nth(${part.index})`
  }
}
