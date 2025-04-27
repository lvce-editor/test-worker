import type { ILocator } from '../ILocator/ILocator.ts'
import { locatorInvoke } from '../LocatorInvoke/LocatorInvoke.ts'
import { printLocator } from '../PrintLocator/PrintLocator.ts'

export const toBeVisible = (locator: ILocator): string => {
  return `expected selector to be visible ${locator._selector}`
}

export const toHaveValue = (
  locator: ILocator,
  {
    value,
  }: {
    readonly value: string
  },
): string => {
  return `expected selector ${locator._selector} to have value ${value}`
}

export const toHaveText = async (locator: ILocator, options: { readonly text: string }): Promise<string> => {
  const locatorString = printLocator(locator)
  const { wasFound, actual } = await locatorInvoke(locator, 'TestFrameWork.conditionToHaveAttribute', locator, options)
  const { text } = options
  if (!wasFound) {
    return `expected selector ${locatorString} to have text "${text}" element was not found`
  }
  return `expected selector ${locatorString} to have text "${text}" but was "${actual}"`
}

export const toHaveAttribute = async (
  locator: ILocator,
  options: {
    readonly key: string
    readonly value: string
  },
): Promise<string> => {
  const locatorString = printLocator(locator)
  const { wasFound, actual } = await locatorInvoke(locator, 'TestFrameWork.conditionToHaveAttribute', locator, options)
  const { key, value } = options
  if (!wasFound) {
    return `expected ${locatorString} to have attribute ${key} ${value} but element was not found`
  }
  return `expected ${locatorString} to have attribute ${key} ${value} but was ${actual}`
}

export const toHaveCount = async (
  locator: ILocator,
  {
    count,
  }: {
    readonly count: number
  },
): Promise<string> => {
  const locatorString = printLocator(locator)
  const { actual } = await locatorInvoke(locator, 'TestFrameWork.conditionToHaveCount', locator)
  return `expected ${locatorString} to have count ${count} but was ${actual}`
}

export const toBeFocused = async (locator: ILocator): Promise<string> => {
  const locatorString = printLocator(locator)
  const { actual } = await locatorInvoke(locator, 'TestFrameWork.conditionToBeFocused', locator)
  return `expected ${locatorString} to be focused but active element is ${actual}`
}

export const toHaveClass = async (
  locator: ILocator,
  options: {
    readonly className: string
  },
): Promise<string> => {
  const locatorString = printLocator(locator)
  const { wasFound } = await locatorInvoke(locator, 'TestFrameWork.conditionToHaveCss', locator, options)
  const { className } = options
  if (!wasFound) {
    return `expected ${locatorString} to have class ${className} but element was not found`
  }
  return `expected ${locatorString} to have class ${className}`
}

export const toHaveId = async (
  locator: ILocator,
  options: {
    readonly id: string
  },
): Promise<string> => {
  const { wasFound, actual } = await locatorInvoke(locator, 'TestFrameWork.conditionToHaveId', locator, options)
  const locatorString = printLocator(locator)
  const { id } = options
  if (!wasFound) {
    return `expected ${locatorString} to have id ${id} but element was not found`
  }
  return `expected ${locatorString} to have id ${id} but was ${actual}`
}

export const toBeHidden = (locator: ILocator): string => {
  const locatorString = printLocator(locator)
  return `expected ${locatorString} to be hidden`
}

export const toHaveCss = async (
  locator: ILocator,
  options: {
    readonly key: string
    readonly value: string
  },
): Promise<string> => {
  const { wasFound, actual } = await locatorInvoke(locator, 'TestFrameWork.conditionToHaveCss', locator, options)
  const locatorString = printLocator(locator)
  const { key, value } = options
  if (!wasFound) {
    return `expected ${locatorString} to have css ${key} ${value} but element was not found`
  }
  return `expected ${locatorString} to have css ${key} ${value} but was ${actual}`
}
