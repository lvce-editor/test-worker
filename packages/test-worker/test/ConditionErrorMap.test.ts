import { expect, test } from '@jest/globals'
import * as ConditionErrorMap from '../src/parts/ConditionErrorMap/ConditionErrorMap.ts'
import * as ConditionErrors from '../src/parts/ConditionErrors/ConditionErrors.ts'
import * as ConditionType from '../src/parts/ConditionType/ConditionType.ts'

test('getFunction: known mappings', () => {
  expect(ConditionErrorMap.getFunction(ConditionType.ToBeVisible)).toBe(ConditionErrors.toBeVisible)
  expect(ConditionErrorMap.getFunction(ConditionType.ToHaveValue)).toBe(ConditionErrors.toHaveValue)
  expect(ConditionErrorMap.getFunction(ConditionType.ToHaveText)).toBe(ConditionErrors.toHaveText)
  expect(ConditionErrorMap.getFunction(ConditionType.ToHaveAttribute)).toBe(ConditionErrors.toHaveAttribute)
  expect(ConditionErrorMap.getFunction(ConditionType.ToHaveCount)).toBe(ConditionErrors.toHaveCount)
  expect(ConditionErrorMap.getFunction(ConditionType.ToBeFocused)).toBe(ConditionErrors.toBeFocused)
  expect(ConditionErrorMap.getFunction(ConditionType.ToHaveId)).toBe(ConditionErrors.toHaveId)
  expect(ConditionErrorMap.getFunction(ConditionType.ToBeHidden)).toBe(ConditionErrors.toBeHidden)
  expect(ConditionErrorMap.getFunction(ConditionType.ToHaveCss)).toBe(ConditionErrors.toHaveCss)
  expect(ConditionErrorMap.getFunction(ConditionType.ToHaveClass)).toBe(ConditionErrors.toHaveClass)
  expect(ConditionErrorMap.getFunction(ConditionType.ToHaveJSProperty)).toBe(ConditionErrors.toHaveJSProperty)
})

test('getFunction: unknown throws', () => {
  expect(() => ConditionErrorMap.getFunction(-1)).toThrow('unexpected function name -1')
})
