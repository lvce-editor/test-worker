import type { ILocator } from '../ILocator/ILocator.ts'

export const printLocator = (locator: ILocator): string => {
  if (locator._nth !== -1) {
    return `${locator._selector}:nth(${locator._nth})`
  }
  if (locator._hasText) {
    return `${locator._selector} "${locator._hasText}"`
  }
  return `${locator._selector}`
}
