import type { Diagnostic } from '../Diagnostic/Diagnostic.ts'

export const isDiagnosticEqual = (actual: Diagnostic, expected: Diagnostic): boolean => {
  return (
    actual.rowIndex === expected.rowIndex &&
    actual.columnIndex === expected.columnIndex &&
    actual.endRowIndex === expected.endRowIndex &&
    actual.endColumnIndex === expected.endColumnIndex &&
    actual.message === expected.message &&
    actual.type === expected.type
  )
}
