import * as GetLocatorRpc from '../GetLocatorRpc/GetLocatorRpc.ts'
import * as Assert from '../TestAssert/TestAssert.ts'

export const expect = (locator: any): any => {
  const { invoke } = GetLocatorRpc.getLocatorRpc(locator)
  return {
    async checkSingleElementCondition(fnName: string, options: any): Promise<void> {
      // TODO add rpcId property to locator instead
      const result = await invoke('TestFrameWork.checkSingleElementCondition', locator, fnName, options)
      if (result && result.error) {
        // TODO construct error
      }
    },
    async checkMultiElementCondition(fnName: string, options: any): Promise<void> {
      const result = await invoke('TestFrameWork.checkMultiElementCondition', locator, fnName, options)
      if (result && result.error) {
        // TODO construct error
      }
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
    async toContainText(text: string): Promise<void> {
      Assert.string(text, 'text must be of type string')
      return this.checkSingleElementCondition('toContainText', { text })
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
    async toHaveAttribute(key: string, value: string): Promise<void> {
      Assert.string(key, 'key must be of type string')
      // Assert.string(value, 'value must be of type string')
      return this.checkSingleElementCondition('toHaveAttribute', {
        key,
        value,
      })
    },
    async toHaveClass(className: string): Promise<void> {
      Assert.string(className, 'className must be of type string')
      return this.checkSingleElementCondition('toHaveClass', {
        className,
      })
    },
    async toHaveId(id: string): Promise<void> {
      Assert.string(id, 'id must be of type string')
      return this.checkSingleElementCondition('toHaveId', {
        id,
      })
    },
    async toHaveCount(count: number): Promise<void> {
      Assert.number(count, 'count must be of type number')
      return this.checkMultiElementCondition('toHaveCount', { count })
    },
    async toBeHidden(): Promise<void> {
      return this.checkMultiElementCondition('toBeHidden', {})
    },
    get not(): any {
      this.negated = true
      return this
    },
  }
}
