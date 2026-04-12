import type { ILocatorInternal } from '../ILocatorInternal/ILocatorInternal.ts'

export const printLocator = (locator: ILocatorInternal): string => {
  return locator._parsed.reduce((result, part) => {
    if (part.type === 'css') {
      if (!result) {
        return part.selector
      }
      return `${result} >> ${part.selector}`
    }
    if (part.type === 'text') {
      if (!result) {
        return `text=${part.text}`
      }
      return `${result} text=${part.text}`
    }
    if (part.type === 'has-text') {
      return `${result} "${part.text}"`
    }
    return `${result}:nth(${part.index})`
  }, '')
}
