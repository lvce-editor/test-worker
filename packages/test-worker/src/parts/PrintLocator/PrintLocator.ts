import { ILocatorInternal } from '../ILocatorInternal/ILocatorInternal.ts'

export const printLocator = (locator: ILocatorInternal): string => {
  if (locator._nth !== -1) {
    return `${locator._selector}:nth(${locator._nth})`
  }
  if (locator._hasText) {
    return `${locator._selector} "${locator._hasText}"`
  }
  return `${locator._selector}`
}
