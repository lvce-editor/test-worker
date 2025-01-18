// @ts-nocheck

import * as Rpc from '../ParentRpc/ParentRpc.ts'

const Assert = {
  string(value: any, message: string): void {
    if (typeof value !== 'string') {
      throw new TypeError(message)
    }
  },
  number(value: any, message: string): void {
    if (typeof value !== 'number' ||Number. isNaN(value)) {
      throw new TypeError(message)
    }
  },
}

export const expect = (locator: any): any => {
  const { invoke } = locator.webView || Rpc
  return {
    async checkSingleElementCondition(fnName, options) {
      Assert.string(fnName)
      // TODO add rpcId property to locator instead
      return invoke('TestFrameWork.checkSingleElementCondition', locator, fnName, options)
    },
    async checkMultiElementCondition(fnName, options) {
      return invoke('TestFrameWork.checkMultiElementCondition', locator, fnName, options)
    },
    async toBeVisible() {
      if (this.negated) {
        throw new Error('use toBeHidden instead of not.toBeVisible')
      }
      return this.checkSingleElementCondition('toBeVisible', {})
    },
    async toHaveText(text) {
      Assert.string(text, 'text must be of type string')
      return this.checkSingleElementCondition('toHaveText', { text })
    },
    async toContainText(text) {
      Assert.string(text, 'text must be of type string')
      return this.checkSingleElementCondition('toContainText', { text })
    },
    async toHaveValue(value) {
      Assert.string(value, 'value must be of type string')
      return this.checkSingleElementCondition('toHaveValue', { value })
    },
    async toBeFocused() {
      return this.checkSingleElementCondition('toBeFocused')
    },
    async toHaveCSS(key, value) {
      return this.checkSingleElementCondition('toHaveCss', {
        key,
        value,
      })
    },
    async toHaveAttribute(key, value) {
      Assert.string(key, 'key must be of type string')
      // Assert.string(value, 'value must be of type string')
      return this.checkSingleElementCondition('toHaveAttribute', {
        key,
        value,
      })
    },
    async toHaveClass(className) {
      Assert.string(className, 'className must be of type string')
      return this.checkSingleElementCondition('toHaveClass', {
        className,
      })
    },
    async toHaveId(id) {
      Assert.string(id, 'id must be of type string')
      return this.checkSingleElementCondition('toHaveId', {
        id,
      })
    },
    async toHaveCount(count) {
      Assert.number(count, 'count must be of type string')
      return this.checkMultiElementCondition('toHaveCount', { count })
    },
    async toBeHidden() {
      return this.checkMultiElementCondition('toBeHidden', {})
    },
    get not() {
      this.negated = true
      return this
    },
  }
}
