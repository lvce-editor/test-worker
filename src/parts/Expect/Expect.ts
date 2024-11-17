// @ts-nocheck

import * as Rpc from '../ParentRpc/ParentRpc.ts'

const Assert = {
  string(value: any, message: string): void {
    if (typeof value !== 'string') {
      throw new TypeError(message)
    }
  },
  number(value: any, message: string): void {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new TypeError(message)
    }
  },
}

export const expect = (locator: any): any => {
  const { invoke } = locator.webView || Rpc
  return {
    async checkSingleElementCondition(fnName: string, options: any): Promise<void> {
      Assert.string(fnName)
      return invoke('TestFrameWork.checkSingleElementCondition', locator, fnName, options)
    },
    async checkMultiElementCondition(fnName: string, options: any): Promise<void> {
      return invoke('TestFrameWork.checkMultiElementCondition', locator, fnName, options)
    },
    async toBeVisible(): Promise<void> {
      if (this.negated) {
        throw new Error('use toBeHidden instead of not.toBeVisible')
      }
      return this.checkSingleElementCondition('toBeVisible', {})
    },
    async toHaveText(text: string): Promise<void> {
      Assert.string(text, 'text must be of type string')
      return this.checkSingleElementCondition('toHaveText', { text })
    },
    async toHaveValue(value: string): Promise<void> {
      Assert.string(value, 'value must be of type string')
      return this.checkSingleElementCondition('toHaveValue', { value })
    },
    async toBeFocused(): Promise<void> {
      return this.checkSingleElementCondition('toBeFocused')
    },
    async toHaveCSS(key: string, value: string): Promise<void> {
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
