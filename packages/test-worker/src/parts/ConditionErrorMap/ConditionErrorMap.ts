import * as ConditionErrors from '../ConditionErrors/ConditionErrors.ts'

export const getFunction = (fnName: string): any => {
  switch (fnName) {
    case 'toBeFocused':
      return ConditionErrors.toBeFocused
    case 'toBeHidden':
      return ConditionErrors.toBeHidden
    case 'toBeVisible':
      return ConditionErrors.toBeVisible
    case 'toContainText':
      return ConditionErrors.toContainText
    case 'toHaveAttribute':
      return ConditionErrors.toHaveAttribute
    case 'toHaveClass':
      return ConditionErrors.toHaveClass
    case 'toHaveCount':
      return ConditionErrors.toHaveCount
    case 'toHaveCss':
      return ConditionErrors.toHaveCss
    case 'toHaveId':
      return ConditionErrors.toHaveId
    case 'toHaveJSProperty':
      return ConditionErrors.toHaveJSProperty
    case 'toHaveText':
      return ConditionErrors.toHaveText
    case 'toHaveValue':
      return ConditionErrors.toHaveValue
    default:
      throw new Error(`unexpected function name ${fnName}`)
  }
}
