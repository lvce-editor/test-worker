// @ts-nocheck

import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const create = (selector: string, options: any = {}): any => {
  return new Locator(selector, options)
}

const Locator = function (selector, { nth = -1, hasText = '' } = {}) {
  this._selector = selector
  this._nth = nth
  this._hasText = hasText
}

const performAction = async (locator, fnName, options) => {
  const { invoke } = locator.webView || Rpc
  return invoke('TestFrameWork.performAction', locator, fnName, options)
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

Locator.prototype.click = async function (options: any = {}): Promise<void> {
  return performAction(this, 'click', {
    bubbles: true,
    button: 0,
    cancable: true,
    detail: 1,
    ...options,
  })
}

Locator.prototype.hover = async function (): Promise<void> {
  return performAction(this, 'hover', {
    bubbles: true,
    cancable: true,
  })
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
