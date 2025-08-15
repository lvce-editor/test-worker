import { getLocatorInvoke } from '../GetLocatorInvoke/GetLocatorInvoke.ts'
import * as GetLocatorRpc from '../GetLocatorRpc/GetLocatorRpc.ts'
import * as ToButtonNumber from '../ToButtonNumber/ToButtonNumber.ts'

export const create = (selector: string, options: any = {}): any => {
  // @ts-ignore
  return new Locator(selector, options)
}

const Locator = function (selector: any, { nth = -1, hasText = '' }: { readonly nth?: number; readonly hasText?: string } = {}): any {
  // @ts-ignore
  this._selector = selector
  // @ts-ignore
  this._nth = nth
  // @ts-ignore
  this._hasText = hasText
}

const performAction = async (locator: any, action: string, options: any): Promise<any> => {
  const invoke = getLocatorInvoke(locator)
  return invoke('TestFrameWork.performAction', locator, action, options)
}

Locator.prototype.click = async function ({ button = 'left' }: { readonly button?: string } = {}): Promise<void> {
  const options = {
    cancable: true,
    bubbles: true,
    button: ToButtonNumber.toButtonNumber(button),
    detail: 1,
  }
  return performAction(this, 'click', options)
}

Locator.prototype.hover = async function (): Promise<void> {
  const options = {
    cancable: true,
    bubbles: true,
  }
  return performAction(this, 'hover', options)
}

Locator.prototype.first = function (): any {
  return create(this._selector, {
    nth: 0,
  })
}

Locator.prototype.locator = function (subSelector: string): any {
  if (this._nth !== -1) {
    return create(`${this._selector}:nth-of-type(${this._nth + 1}) ${subSelector}`)
  }
  return create(`${this._selector} ${subSelector}`)
}

Locator.prototype.nth = function (nth: number): any {
  return create(this._selector, { nth })
}

Locator.prototype.type = async function (text: string): Promise<void> {
  const options = { text }
  return performAction(this, 'type', options)
}

Locator.prototype.dispatchEvent = async function (type: string, init: any): Promise<void> {
  return performAction(this, 'dispatchEvent', { type, init })
}
