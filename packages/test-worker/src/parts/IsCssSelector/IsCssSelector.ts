import { getStartToken } from '../GetStartToken/GetStartToken.ts'
import { isElement } from '../IsElement/IsElement.ts'

export const isCssSelector = (selector: string): boolean => {
  if (!selector) {
    return false
  }
  if (selector.startsWith('.') || selector.startsWith('#') || selector.startsWith('[') || selector.startsWith('*') || selector.startsWith(':')) {
    return true
  }
  const startToken = getStartToken(selector)
  if (!startToken) {
    return false
  }
  return isElement(startToken)
}
