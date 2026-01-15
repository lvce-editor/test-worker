import type { ILocator } from '../ILocator/ILocator.ts'
import type { ILocatorCreateOptions } from '../ILocatorCreateOptions/ILocatorCreateOptions.ts'
import { performAction } from '../PerformAction/PerformAction.ts'
import * as ToButtonNumber from '../ToButtonNumber/ToButtonNumber.ts'

export class Locator implements ILocator {
  readonly _selector: any
  readonly _nth: number
  readonly _hasText: string

  constructor(selector: any, { hasText = '', nth = -1 }: ILocatorCreateOptions = {}) {
    this._selector = selector
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
