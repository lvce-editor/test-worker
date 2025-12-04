import { expect, test } from '@jest/globals'
import type { Diagnostic } from '../src/parts/Diagnostic/Diagnostic.ts'
import { isDiagnosticEqual } from '../src/parts/IsDiagnosticEqual/IsDiagnosticEqual.ts'

const createDiagnostic = (
  rowIndex: number,
  columnIndex: number,
  endRowIndex: number,
  endColumnIndex: number,
  message: string,
  type: 'error' | 'warning',
): Diagnostic => ({
  columnIndex,
  endColumnIndex,
  endRowIndex,
  message,
  rowIndex,
  type,
})

test('isDiagnosticEqual: equal diagnostics', () => {
  const actual = createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')
  const expected = createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')
  expect(isDiagnosticEqual(actual, expected)).toBe(true)
})

test('isDiagnosticEqual: different rowIndex', () => {
  const actual = createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')
  const expected = createDiagnostic(1, 0, 0, 5, 'Syntax error', 'error')
  expect(isDiagnosticEqual(actual, expected)).toBe(false)
})

test('isDiagnosticEqual: different columnIndex', () => {
  const actual = createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')
  const expected = createDiagnostic(0, 1, 0, 5, 'Syntax error', 'error')
  expect(isDiagnosticEqual(actual, expected)).toBe(false)
})

test('isDiagnosticEqual: different endRowIndex', () => {
  const actual = createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')
  const expected = createDiagnostic(0, 0, 1, 5, 'Syntax error', 'error')
  expect(isDiagnosticEqual(actual, expected)).toBe(false)
})

test('isDiagnosticEqual: different endColumnIndex', () => {
  const actual = createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')
  const expected = createDiagnostic(0, 0, 0, 6, 'Syntax error', 'error')
  expect(isDiagnosticEqual(actual, expected)).toBe(false)
})

test('isDiagnosticEqual: different message', () => {
  const actual = createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')
  const expected = createDiagnostic(0, 0, 0, 5, 'Different error', 'error')
  expect(isDiagnosticEqual(actual, expected)).toBe(false)
})

test('isDiagnosticEqual: different type', () => {
  const actual = createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')
  const expected = createDiagnostic(0, 0, 0, 5, 'Syntax error', 'warning')
  expect(isDiagnosticEqual(actual, expected)).toBe(false)
})

test('isDiagnosticEqual: warning type diagnostics', () => {
  const actual = createDiagnostic(2, 3, 2, 10, 'Warning message', 'warning')
  const expected = createDiagnostic(2, 3, 2, 10, 'Warning message', 'warning')
  expect(isDiagnosticEqual(actual, expected)).toBe(true)
})

test('isDiagnosticEqual: all properties different', () => {
  const actual = createDiagnostic(0, 0, 0, 5, 'Error', 'error')
  const expected = createDiagnostic(1, 1, 1, 6, 'Warning', 'warning')
  expect(isDiagnosticEqual(actual, expected)).toBe(false)
})
