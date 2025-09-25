import type { Diagnostic } from '../Diagnostic/Diagnostic.ts'
import { isDiagnosticEqual } from '../IsDiagnosticEqual/IsDiagnosticEqual.ts'

export const areDiagnosticsEqual = (actual: readonly Diagnostic[], expected: readonly Diagnostic[]): boolean => {
  if (actual.length !== expected.length) {
    return false
  }

  for (let i = 0; i < actual.length; i++) {
    if (!isDiagnosticEqual(actual[i], expected[i])) {
      return false
    }
  }

  return true
}
