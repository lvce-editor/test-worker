export interface Locator {
  readonly _selector: string
  readonly _nth: number
  readonly _hasText: string
}

export const toBeVisible = (locator: Locator): string => {
  return `expected selector to be visible ${locator._selector}`
}

export const toHaveValue = (
  locator: Locator,
  {
    value,
  }: {
    readonly value: string
  },
): string => {
  return `expected selector ${locator._selector} to have value ${value}`
}

const printLocator = (locator: Locator): string => {
  if (locator._nth !== -1) {
    return `${locator._selector}:nth(${locator._nth})`
  }
  if (locator._hasText) {
    return `${locator._selector} "${locator._hasText}"`
  }
  return `${locator._selector}`
}

export const toHaveText = (locator: Locator, { text }: { readonly text: string }, wasFound: boolean, actual: string): string => {
  const locatorString = printLocator(locator)
  if (!wasFound) {
    return `expected selector ${locatorString} to have text "${text}" element was not found`
  }
  return `expected selector ${locatorString} to have text "${text}" but was "${actual}"`
}

export const toHaveAttribute = (
  locator: Locator,
  {
    key,
    value,
  }: {
    readonly key: string
    readonly value: string
  },
  wasFound: boolean,
  actual: string,
): string => {
  const locatorString = printLocator(locator)
  if (!wasFound) {
    return `expected ${locatorString} to have attribute ${key} ${value} but element was not found`
  }
  return `expected ${locatorString} to have attribute ${key} ${value} but was ${actual}`
}

export const toHaveCount = (
  locator: Locator,
  {
    count,
  }: {
    readonly count: number
  },
  actualCount: number,
): string => {
  const locatorString = printLocator(locator)
  return `expected ${locatorString} to have count ${count} but was ${actualCount}`
}

const stringifyElement = (element: any, documentBody: any): string => {
  if (element.id) {
    return `#${element.id}`
  }
  if (element.className) {
    return `.${element.className}`
  }
  if (element === documentBody) {
    return 'document.body'
  }
  return element.tagName
}

export const toBeFocused = (locator: Locator, activeElement: any, documentBody: any): string => {
  const locatorString = printLocator(locator)
  const stringifiedActiveElement = stringifyElement(activeElement, documentBody)
  return `expected ${locatorString} to be focused but active element is ${stringifiedActiveElement}`
}

export const toHaveClass = (
  locator: Locator,
  {
    className,
  }: {
    readonly className: string
  },
  wasFound: boolean,
  actual: string,
): string => {
  const locatorString = printLocator(locator)
  if (!wasFound) {
    return `expected ${locatorString} to have class ${className} but element was not found`
  }
  return `expected ${locatorString} to have class ${className}`
}

export const toHaveId = (
  locator: Locator,
  {
    id,
  }: {
    readonly id: string
  },
  wasFound: boolean,
  actual: string,
): string => {
  const locatorString = printLocator(locator)
  if (!wasFound) {
    return `expected ${locatorString} to have id ${id} but element was not found`
  }
  return `expected ${locatorString} to have id ${id} but was ${actual}`
}

export const toBeHidden = (locator: Locator): string => {
  const locatorString = printLocator(locator)
  return `expected ${locatorString} to be hidden`
}

export const toHaveCss = (
  locator: Locator,
  {
    key,
    value,
  }: {
    readonly key: string
    readonly value: string
  },
  wasFound: boolean,
  styleValue: string,
): string => {
  const locatorString = printLocator(locator)
  if (!wasFound) {
    return `expected ${locatorString} to have css ${key} ${value} but element was not found`
  }
  return `expected ${locatorString} to have css ${key} ${value} but was ${styleValue}`
}
