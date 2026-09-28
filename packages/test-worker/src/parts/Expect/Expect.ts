import type { ILocator } from '../ILocator/ILocator.ts'
import type { ILocatorExternal } from '../ILocatorExternal/ILocatorExternal.ts'
import type { LocatorExpect } from '../LocatorExpect/LocatorExpect.ts'
import { AssertionError } from '../AssertionError/AssertionError.ts'
import * as ConditionErrorMap from '../ConditionErrorMap/ConditionErrorMap.ts'
import * as ConditionType from '../ConditionType/ConditionType.ts'
import * as GetConditionLocator from '../GetConditionLocator/GetConditionLocator.ts'
import * as LocatorInvoke from '../LocatorInvoke/LocatorInvoke.ts'
import * as Assert from '../TestAssert/TestAssert.ts'

export const expect = (locator: ILocatorExternal): LocatorExpect => {
  return new Expect(locator)
}

class Expect {
  readonly negated: boolean = false
  readonly locator: ILocator

  constructor(locator: ILocatorExternal, negated: boolean = false) {
    this.locator = locator as ILocator
    this.negated = negated
  }

  async checkSingleElementCondition(conditionType: number, options?: any): Promise<void> {
    // TODO add rpcId property to locator instead
    const conditionLocator = GetConditionLocator.getConditionLocator(this.locator)
    const result = await LocatorInvoke.locatorInvoke(
      this.locator,
      'TestFrameWork.checkSingleElementCondition',
      conditionLocator,
      conditionType,
      options,
    )
    if (result && result.error) {
      const fn = ConditionErrorMap.getFunction(conditionType)
      const errorInfo = await fn(this.locator, options)
      throw new AssertionError(errorInfo)
    }
  }
  async checkMultiElementCondition(conditionType: number, options: any): Promise<void> {
    const conditionLocator = GetConditionLocator.getConditionLocator(this.locator)
    const result = await LocatorInvoke.locatorInvoke(
      this.locator,
      'TestFrameWork.checkMultiElementCondition',
      conditionLocator,
      conditionType,
      options,
    )
    if (result && result.error) {
      const fn = ConditionErrorMap.getFunction(conditionType)
      const errorInfo = await fn(this.locator, options)
      throw new AssertionError(errorInfo)
    }
  }
  async toBeVisible(): Promise<void> {
    if (this.negated) {
      throw new Error('use toBeHidden instead of not.toBeVisible')
    }
    return this.checkSingleElementCondition(ConditionType.ToBeVisible, {})
  }
  async toHaveText(text: string): Promise<void> {
    Assert.string(text, 'text must be of type string')
    return this.checkSingleElementCondition(ConditionType.ToHaveText, { text })
  }
  async toContainText(text: string): Promise<void> {
    Assert.string(text, 'text must be of type string')
    return this.checkSingleElementCondition(ConditionType.ToContainText, { text })
  }
  async toHaveValue(value: string): Promise<void> {
    Assert.string(value, 'value must be of type string')
    return this.checkSingleElementCondition(ConditionType.ToHaveValue, { value })
  }
  async toBeFocused(): Promise<void> {
    return this.checkSingleElementCondition(ConditionType.ToBeFocused)
  }
  async toHaveCSS(key: string, value: string | RegExp): Promise<void> {
    return this.checkSingleElementCondition(ConditionType.ToHaveCss, {
      key,
      value,
    })
  }
  async toHaveAttribute(key: string, value: string | null): Promise<void> {
    Assert.string(key, 'key must be of type string')
    return this.checkSingleElementCondition(ConditionType.ToHaveAttribute, {
      key,
      value,
    })
  }
  async toHaveJSProperty(key: string, value: any): Promise<void> {
    Assert.string(key, 'key must be of type string')
    return this.checkSingleElementCondition(ConditionType.ToHaveJSProperty, {
      key,
      value,
    })
  }
  async toHaveClass(className: string): Promise<void> {
    Assert.string(className, 'className must be of type string')
    return this.checkSingleElementCondition(ConditionType.ToHaveClass, {
      className,
    })
  }
  async toHaveId(id: string): Promise<void> {
    Assert.string(id, 'id must be of type string')
    return this.checkSingleElementCondition(ConditionType.ToHaveId, {
      id,
    })
  }
  async toHaveCount(count: number): Promise<void> {
    Assert.number(count, 'count must be of type number')
    return this.checkMultiElementCondition(ConditionType.ToHaveCount, { count })
  }
  async toBeHidden(): Promise<void> {
    return this.checkMultiElementCondition(ConditionType.ToBeHidden, {})
  }
  get not(): Expect {
    return new Expect(this.locator, !this.negated)
  }
}
