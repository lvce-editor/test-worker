import type { ILocator } from '../ILocator/ILocator.ts'
import type { ILocatorCreateOptions } from '../ILocatorCreateOptions/ILocatorCreateOptions.ts'
import type { ParsedCssSelector } from '../ParseCssSelector/ParseCssSelector.ts'
import { parseCssSelector } from '../ParseCssSelector/ParseCssSelector.ts'
import { performAction } from '../PerformAction/PerformAction.ts'
import * as Assert from '../TestAssert/TestAssert.ts'
import * as ToButtonNumber from '../ToButtonNumber/ToButtonNumber.ts'

export class Locator implements ILocator {
  readonly _selector: string
  readonly _nth: number
  readonly _hasText: string
  readonly _parsed: ParsedCssSelector

  constructor(selector: string, options: ILocatorCreateOptions = {}) {
    if (!options || typeof options !== 'object' || Array.isArray(options)) {
      throw new TypeError('options must be of type object')
    }
    const { hasText = '', nth = -1 } = options
    Assert.string(hasText, 'options.hasText must be of type string')
    Assert.number(nth, 'options.nth must be of type number')
    this._selector = selector
    this._parsed = parseCssSelector(selector)
    this._nth = nth
    this._hasText = hasText
  }

  async click({ button = 'left' }: { readonly button?: string } = {}): Promise<void> {
    const options = {
      bubbles: true,
      button: ToButtonNumber.toButtonNumber(button),
      cancable: true,
      detail: 1,
    }
    return performAction(this, 'click', options)
  }

  async hover(): Promise<void> {
    const options = {
      bubbles: true,
      cancable: true,
    }
    return performAction(this, 'hover', options)
  }

  first(): any {
    return new Locator(this._selector, {
      nth: 0,
    })
  }

  locator(subSelector: string): any {
    if (this._nth !== -1) {
      return new Locator(`${this._selector}:nth-of-type(${this._nth + 1}) ${subSelector}`)
    }
    return new Locator(`${this._selector} ${subSelector}`)
  }

  nth(nth: number): any {
    return new Locator(this._selector, { nth })
  }

  async type(text: string): Promise<void> {
    const options = { text }
    return performAction(this, 'type', options)
  }

  async dispatchEvent(type: string, init: any): Promise<void> {
    return performAction(this, 'dispatchEvent', { init, type })
  }
}
