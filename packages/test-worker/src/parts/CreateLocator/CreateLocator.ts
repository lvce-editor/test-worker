import type { ILocator } from '../ILocator/ILocator.ts'
import type { ILocatorCreateOptions } from '../ILocatorCreateOptions/ILocatorCreateOptions.ts'
import { Locator } from '../Locator/Locator.ts'

export const createLocator = (selector: string, options: ILocatorCreateOptions = {}): ILocator => {
  return new Locator(selector, options)
}
