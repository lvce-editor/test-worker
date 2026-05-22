import { isObject } from '../TryAutoFixIsObject/TryAutoFixIsObject.ts'

export const projectActualOntoExpected = (actualValue: unknown, expectedValue: unknown): unknown => {
  if (Array.isArray(expectedValue)) {
    if (!Array.isArray(actualValue)) {
      return actualValue
    }
    const length = Math.min(expectedValue.length, actualValue.length)
    return actualValue.slice(0, length).map((item, index) => projectActualOntoExpected(item, expectedValue[index]))
  }
  if (isObject(expectedValue)) {
    if (!isObject(actualValue)) {
      return actualValue
    }
    const result: Record<string, unknown> = {}
    for (const key of Object.keys(expectedValue)) {
      if (!Object.hasOwn(actualValue, key)) {
        continue
      }
      result[key] = projectActualOntoExpected(actualValue[key], expectedValue[key])
    }
    return result
  }
  return actualValue
}