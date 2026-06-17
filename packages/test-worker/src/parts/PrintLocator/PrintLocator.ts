import type { ILocatorInternal } from '../ILocatorInternal/ILocatorInternal.ts'

export const printLocator = (locator: ILocatorInternal): string => {
  let result = ''
  for (const part of locator._parsed) {
    if (part.type === 'css') {
      if (!result) {
        result = part.selector
        continue
      }
      result += ` >> ${part.selector}`
      continue
    }
    if (part.type === 'text') {
      if (!result) {
        result = `text=${part.text}`
        continue
      }
      result += ` text=${part.text}`
      continue
    }
    if (part.type === 'has-text') {
      result += ` "${part.text}"`
      continue
    }
    result += `:nth(${part.index})`
  }
  return result
}
