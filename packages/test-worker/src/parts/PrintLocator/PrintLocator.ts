import type { ILocatorInternal } from '../ILocatorInternal/ILocatorInternal.ts'

export const printLocator = (locator: ILocatorInternal): string => {
  let result = ''
  for (const part of locator._parsed) {
    if (part.type === 'css') {
      if (!result) {
        result = part.selector
        continue
      }
      result = `${result} >> ${part.selector}`
      continue
    }
    if (part.type === 'text') {
      if (!result) {
        result = `text=${part.text}`
        continue
      }
      result = `${result} text=${part.text}`
      continue
    }
    if (part.type === 'has-text') {
      result = `${result} "${part.text}"`
      continue
    }
    result = `${result}:nth(${part.index})`
  }
  return result
}
