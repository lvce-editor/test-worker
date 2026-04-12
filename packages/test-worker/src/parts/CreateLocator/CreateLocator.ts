import type { ILocator } from '../ILocator/ILocator.ts'
import type { ILocatorCreateOptions } from '../ILocatorCreateOptions/ILocatorCreateOptions.ts'
import { Locator } from '../Locator/Locator.ts'
import * as Assert from '../TestAssert/TestAssert.ts'

export const createLocator = (selector: string, options: ILocatorCreateOptions = {}): ILocator => {
  Assert.string(selector, 'selector must be of type string')
  return new Locator(selector, options)
}
