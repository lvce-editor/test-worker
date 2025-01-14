// @ts-nocheck

import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const create = (selector: string, options: any = {}): any => {
  return new Locator(selector, options)
}

const Locator = function (selector, { nth = -1, hasText = '' }: { readonly nth?: number; readonly hasText?: string } = {}) {
  this._selector = selector
  this._nth = nth
  this._hasText = hasText
}

const performAction = async (locator: any, action: string, options: any): Promise<any> => {
  const { invoke } = locator.webView || Rpc
  return invoke('TestFrameWork.performAction', locator, action, options)
}

const toButtonNumber = (buttonType) => {
  switch (buttonType) {
    case 'left':
      return 0
    case 'middle':
      return 1
    case 'right':
      return 2
    default:
      throw new Error(`unsupported button type: ${buttonType}`)
  }
}

Locator.prototype.click = async function ({ button = 'left' } = {}): Promise<void> {
  const options = {
    cancable: true,
    bubbles: true,
    button: toButtonNumber(button),
    detail: 1,
  }
  return performAction(this, 'click', options)
}

Locator.prototype.hover = async function () {
  const options = {
    cancable: true,
    bubbles: true,
  }
  return performAction(this, 'hover', options)
}

Locator.prototype.first = function () {
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
