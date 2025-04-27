import type { Locator } from '../ConditionErrors/ConditionErrors.ts'

export const printLocator = (locator: Locator): string => {
  if (locator._nth !== -1) {
    return `${locator._selector}:nth(${locator._nth})`
  }
  if (locator._hasText) {
    return `${locator._selector} "${locator._hasText}"`
  }
  return `${locator._selector}`
}
