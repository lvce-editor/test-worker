import type { ILocator } from '../ILocator/ILocator.ts'
import { getLocatorInvoke } from '../GetLocatorInvoke/GetLocatorInvoke.ts'
import * as ToButtonNumber from '../ToButtonNumber/ToButtonNumber.ts'

export const create = (selector: string, options: any = {}): any => {
  return new Locator(selector, options)
}

const performAction = async (locator: any, action: string, options: any): Promise<any> => {
  const invoke = getLocatorInvoke(locator)
  return invoke('TestFrameWork.performAction', locator, action, options)
}

class Locator implements ILocator {
  readonly _selector: any
  readonly _nth: number
  readonly _hasText: string

  constructor(selector: any, { nth = -1, hasText = '' }: { readonly nth?: number; readonly hasText?: string } = {}) {
    this._selector = selector
    this._nth = nth
    this._hasText = hasText
  }

  async click({ button = 'left' }: { readonly button?: string } = {}): Promise<void> {
    const options = {
      cancable: true,
      bubbles: true,
      button: ToButtonNumber.toButtonNumber(button),
      detail: 1,
    }
    return performAction(this, 'click', options)
  }

  async hover(): Promise<void> {
    const options = {
      cancable: true,
      bubbles: true,
    }
    return performAction(this, 'hover', options)
  }

  first(): any {
    return create(this._selector, {
      nth: 0,
    })
  }

  locator(subSelector: string): any {
    if (this._nth !== -1) {
      return create(`${this._selector}:nth-of-type(${this._nth + 1}) ${subSelector}`)
    }
    return create(`${this._selector} ${subSelector}`)
  }

  nth(nth: number): any {
    return create(this._selector, { nth })
  }

  async type(text: string): Promise<void> {
    const options = { text }
    return performAction(this, 'type', options)
  }

  async dispatchEvent(type: string, init: any): Promise<void> {
    return performAction(this, 'dispatchEvent', { type, init })
  }
}
