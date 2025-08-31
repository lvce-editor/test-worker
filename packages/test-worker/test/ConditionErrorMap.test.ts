import { expect, test } from '@jest/globals'
import * as ConditionErrorMap from '../src/parts/ConditionErrorMap/ConditionErrorMap.ts'
import * as ConditionErrors from '../src/parts/ConditionErrors/ConditionErrors.ts'

test('getFunction: known mappings', () => {
  expect(ConditionErrorMap.getFunction('toBeVisible')).toBe(ConditionErrors.toBeVisible)
  expect(ConditionErrorMap.getFunction('toHaveValue')).toBe(ConditionErrors.toHaveValue)
  expect(ConditionErrorMap.getFunction('toHaveText')).toBe(ConditionErrors.toHaveText)
  expect(ConditionErrorMap.getFunction('toHaveAttribute')).toBe(ConditionErrors.toHaveAttribute)
  expect(ConditionErrorMap.getFunction('toHaveCount')).toBe(ConditionErrors.toHaveCount)
  expect(ConditionErrorMap.getFunction('toBeFocused')).toBe(ConditionErrors.toBeFocused)
  expect(ConditionErrorMap.getFunction('toHaveId')).toBe(ConditionErrors.toHaveId)
  expect(ConditionErrorMap.getFunction('toBeHidden')).toBe(ConditionErrors.toBeHidden)
  expect(ConditionErrorMap.getFunction('toHaveCss')).toBe(ConditionErrors.toHaveCss)
  expect(ConditionErrorMap.getFunction('toHaveClass')).toBe(ConditionErrors.toHaveClass)
  expect(ConditionErrorMap.getFunction('toHaveJSProperty')).toBe(ConditionErrors.toHaveJSProperty)
})

test('getFunction: unknown throws', () => {
  expect(() => ConditionErrorMap.getFunction('unknown')).toThrow('unexpected function name unknown')
})
