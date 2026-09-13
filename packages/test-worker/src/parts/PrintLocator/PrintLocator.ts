import type { ILocatorInternal } from '../ILocatorInternal/ILocatorInternal.ts'
import { printLocatorPart } from './PrintLocatorPart.ts'

export const printLocator = (locator: ILocatorInternal): string => {
  let result = ''
  for (const part of locator._parsed) {
    result += printLocatorPart(part, Boolean(result))
  }
  return result
}
