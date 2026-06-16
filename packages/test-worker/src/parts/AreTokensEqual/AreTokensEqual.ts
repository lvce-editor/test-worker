export type TokenRow = readonly string[]

export const areTokensEqual = (actual: readonly TokenRow[], expected: readonly TokenRow[]): boolean => {
  if (actual.length !== expected.length) {
    return false
  }
  for (let i = 0; i < actual.length; i++) {
    const actualRow = actual[i]
    const expectedRow = expected[i]
    if (actualRow.length !== expectedRow.length) {
      return false
    }
    for (let j = 0; j < actualRow.length; j++) {
      if (actualRow[j] !== expectedRow[j]) {
        return false
      }
    }
  }
  return true
}
