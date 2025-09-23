import type { ILocatorExternal } from '../ILocatorExternal/ILocatorExternal.ts'
import type { LocatorExpect } from '../LocatorExpect/LocatorExpect.ts'
import { AssertionError } from '../AssertionError/AssertionError.ts'
import * as ConditionErrorMap from '../ConditionErrorMap/ConditionErrorMap.ts'
import * as LocatorInvoke from '../LocatorInvoke/LocatorInvoke.ts'
import * as Assert from '../TestAssert/TestAssert.ts'

export const expect = (locator: ILocatorExternal): LocatorExpect => {
  return new Expect(locator)
}

class Expect {
  readonly negated: boolean = false
  readonly locator: ILocatorExternal

  constructor(locator: ILocatorExternal, negated: boolean = false) {
    this.locator = locator
    this.negated = negated
  }

  async checkSingleElementCondition(fnName: string, options?: any): Promise<void> {
    // TODO add rpcId property to locator instead
    const result = await LocatorInvoke.locatorInvoke(this.locator, 'TestFrameWork.checkSingleElementCondition', this.locator, fnName, options)
    if (result && result.error) {
      const fn = ConditionErrorMap.getFunction(fnName)
      const errorInfo = await fn(this.locator, options)
      throw new AssertionError(errorInfo)
    }
  }
  async checkMultiElementCondition(fnName: string, options: any): Promise<void> {
    const result = await LocatorInvoke.locatorInvoke(this.locator, 'TestFrameWork.checkMultiElementCondition', this.locator, fnName, options)
    if (result && result.error) {
      const fn = ConditionErrorMap.getFunction(fnName)
      const errorInfo = await fn(this.locator, options)
      throw new AssertionError(errorInfo)
    }
  }
  async toBeVisible(): Promise<void> {
    if (this.negated) {
      throw new Error('use toBeHidden instead of not.toBeVisible')
    }
    return this.checkSingleElementCondition('toBeVisible', {})
  }
  async toHaveText(text: string): Promise<void> {
    Assert.string(text, 'text must be of type string')
    return this.checkSingleElementCondition('toHaveText', { text })
  }
  async toContainText(text: string): Promise<void> {
    Assert.string(text, 'text must be of type string')
    return this.checkSingleElementCondition('toContainText', { text })
  }
  async toHaveValue(value: string): Promise<void> {
    Assert.string(value, 'value must be of type string')
    return this.checkSingleElementCondition('toHaveValue', { value })
  }
  async toBeFocused(): Promise<void> {
    return this.checkSingleElementCondition('toBeFocused')
  }
  async toHaveCSS(key: string, value: string): Promise<void> {
    return this.checkSingleElementCondition('toHaveCss', {
      key,
      value,
    })
  }
  async toHaveAttribute(key: string, value: string | null): Promise<void> {
    Assert.string(key, 'key must be of type string')
    // Assert.string(value, 'value must be of type string')
    return this.checkSingleElementCondition('toHaveAttribute', {
      key,
      value,
    })
  }
  async toHaveJSProperty(key: string, value: any): Promise<void> {
    Assert.string(key, 'key must be of type string')
    return this.checkSingleElementCondition('toHaveJSProperty', {
      key,
      value,
    })
  }
  async toHaveClass(className: string): Promise<void> {
    Assert.string(className, 'className must be of type string')
    return this.checkSingleElementCondition('toHaveClass', {
      className,
    })
  }
  async toHaveId(id: string): Promise<void> {
    Assert.string(id, 'id must be of type string')
    return this.checkSingleElementCondition('toHaveId', {
      id,
    })
  }
  async toHaveCount(count: number): Promise<void> {
    Assert.number(count, 'count must be of type number')
    return this.checkMultiElementCondition('toHaveCount', { count })
  }
  async toBeHidden(): Promise<void> {
    return this.checkMultiElementCondition('toBeHidden', {})
  }
  get not(): Expect {
    return new Expect(this.locator, !this.negated)
  }
}
