import * as ConditionErrors from '../ConditionErrors/ConditionErrors.ts'

export const getFunction = (fnName: string): any => {
  switch (fnName) {
    case 'toBeVisible':
      return ConditionErrors.toBeVisible
    case 'toHaveValue':
      return ConditionErrors.toHaveValue
    case 'toHaveText':
      return ConditionErrors.toHaveText
    case 'toContainText':
      return ConditionErrors.toContainText
    case 'toHaveAttribute':
      return ConditionErrors.toHaveAttribute
    case 'toHaveCount':
      return ConditionErrors.toHaveCount
    case 'toBeFocused':
      return ConditionErrors.toBeFocused
    case 'toHaveId':
      return ConditionErrors.toHaveId
    case 'toBeHidden':
      return ConditionErrors.toBeHidden
    case 'toHaveCss':
      return ConditionErrors.toHaveCss
    case 'toHaveClass':
      return ConditionErrors.toHaveClass
    case 'toHaveJSProperty':
      return ConditionErrors.toHaveJSProperty
    default:
      throw new Error(`unexpected function name ${fnName}`)
  }
}
