interface TestResult {
  readonly end: number
  readonly start: number
}

const roundToTwoDecimalPlaces = (value: number): number => {
  return Math.round(value * 100) / 100
}

export const roundTestResults = <T extends TestResult>(results: readonly T[]): readonly T[] => {
  return results.map((result) => ({
    ...result,
    end: roundToTwoDecimalPlaces(result.end),
    start: roundToTwoDecimalPlaces(result.start),
  }))
}
