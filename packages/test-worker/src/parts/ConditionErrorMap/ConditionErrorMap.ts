import * as ConditionErrors from '../ConditionErrors/ConditionErrors.ts'
import * as ConditionType from '../ConditionType/ConditionType.ts'

export const getFunction = (conditionType: number): any => {
  switch (conditionType) {
    case ConditionType.ToBeFocused:
      return ConditionErrors.toBeFocused
    case ConditionType.ToBeHidden:
      return ConditionErrors.toBeHidden
    case ConditionType.ToBeVisible:
      return ConditionErrors.toBeVisible
    case ConditionType.ToContainText:
      return ConditionErrors.toContainText
    case ConditionType.ToHaveAttribute:
      return ConditionErrors.toHaveAttribute
    case ConditionType.ToHaveClass:
      return ConditionErrors.toHaveClass
    case ConditionType.ToHaveCount:
      return ConditionErrors.toHaveCount
    case ConditionType.ToHaveCss:
      return ConditionErrors.toHaveCss
    case ConditionType.ToHaveId:
      return ConditionErrors.toHaveId
    case ConditionType.ToHaveJSProperty:
      return ConditionErrors.toHaveJSProperty
    case ConditionType.ToHaveText:
      return ConditionErrors.toHaveText
    case ConditionType.ToHaveValue:
      return ConditionErrors.toHaveValue
    default:
      throw new Error(`unexpected function name ${conditionType}`)
  }
}
