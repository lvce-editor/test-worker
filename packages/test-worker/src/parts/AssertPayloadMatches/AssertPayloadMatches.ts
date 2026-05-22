const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const formatValue = (value: unknown): string => {
  return JSON.stringify(value)
}

const assertArrayMatches = (actual: unknown, expected: readonly unknown[], path: string): void => {
  if (!Array.isArray(actual)) {
    throw new TypeError(`Expected ${path} to be an array but got ${formatValue(actual)}`)
  }
  if (actual.length < expected.length) {
    throw new Error(`Expected ${path} to have at least ${expected.length} items but got ${actual.length}`)
  }
  for (let index = 0; index < expected.length; index++) {
    assertPayloadMatches(actual[index], expected[index], `${path}[${index}]`)
  }
}

const assertObjectMatches = (actual: unknown, expected: Readonly<Record<string, unknown>>, path: string): void => {
  if (!isObject(actual)) {
    throw new TypeError(`Expected ${path} to be an object but got ${formatValue(actual)}`)
  }
  for (const key of Object.keys(expected)) {
    if (!Object.hasOwn(actual, key)) {
      throw new Error(`Expected ${path}.${key} to exist`)
    }
    assertPayloadMatches(actual[key], expected[key], `${path}.${key}`)
  }
}

const assertPrimitiveMatches = (actual: unknown, expected: unknown, path: string): void => {
  if (!Object.is(actual, expected)) {
    throw new Error(`Expected ${path} to equal ${formatValue(expected)} but got ${formatValue(actual)}`)
  }
}

export const assertPayloadMatches = (actual: unknown, expected: unknown, path: string): void => {
  if (Array.isArray(expected)) {
    assertArrayMatches(actual, expected, path)
    return
  }
  if (isObject(expected)) {
    assertObjectMatches(actual, expected, path)
    return
  }
  assertPrimitiveMatches(actual, expected, path)
}