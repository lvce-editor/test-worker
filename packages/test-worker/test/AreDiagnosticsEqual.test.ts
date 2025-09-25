import { expect, test } from '@jest/globals'
import type { Diagnostic } from '../src/parts/Diagnostic/Diagnostic.ts'
import { areDiagnosticsEqual } from '../src/parts/AreDiagnosticsEqual/AreDiagnosticsEqual.ts'

const createDiagnostic = (
  rowIndex: number,
  columnIndex: number,
  endRowIndex: number,
  endColumnIndex: number,
  message: string,
  type: 'error' | 'warning',
): Diagnostic => ({
  rowIndex,
  columnIndex,
  endRowIndex,
  endColumnIndex,
  message,
  type,
})

test('areDiagnosticsEqual: equal empty arrays', () => {
  const actual: readonly Diagnostic[] = []
  const expected: readonly Diagnostic[] = []
  expect(areDiagnosticsEqual(actual, expected)).toBe(true)
})

test('areDiagnosticsEqual: equal single diagnostic', () => {
  const actual: readonly Diagnostic[] = [createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')]
  const expected: readonly Diagnostic[] = [createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')]
  expect(areDiagnosticsEqual(actual, expected)).toBe(true)
})

test('areDiagnosticsEqual: equal multiple diagnostics', () => {
  const actual: readonly Diagnostic[] = [
    createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error'),
    createDiagnostic(1, 2, 1, 8, 'Warning message', 'warning'),
  ]
  const expected: readonly Diagnostic[] = [
    createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error'),
    createDiagnostic(1, 2, 1, 8, 'Warning message', 'warning'),
  ]
  expect(areDiagnosticsEqual(actual, expected)).toBe(true)
})

test('areDiagnosticsEqual: different array lengths', () => {
  const actual: readonly Diagnostic[] = [createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')]
  const expected: readonly Diagnostic[] = [
    createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error'),
    createDiagnostic(1, 2, 1, 8, 'Warning message', 'warning'),
  ]
  expect(areDiagnosticsEqual(actual, expected)).toBe(false)
})

test('areDiagnosticsEqual: different rowIndex', () => {
  const actual: readonly Diagnostic[] = [createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')]
  const expected: readonly Diagnostic[] = [createDiagnostic(1, 0, 0, 5, 'Syntax error', 'error')]
  expect(areDiagnosticsEqual(actual, expected)).toBe(false)
})

test('areDiagnosticsEqual: different columnIndex', () => {
  const actual: readonly Diagnostic[] = [createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')]
  const expected: readonly Diagnostic[] = [createDiagnostic(0, 1, 0, 5, 'Syntax error', 'error')]
  expect(areDiagnosticsEqual(actual, expected)).toBe(false)
})

test('areDiagnosticsEqual: different endRowIndex', () => {
  const actual: readonly Diagnostic[] = [createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')]
  const expected: readonly Diagnostic[] = [createDiagnostic(0, 0, 1, 5, 'Syntax error', 'error')]
  expect(areDiagnosticsEqual(actual, expected)).toBe(false)
})

test('areDiagnosticsEqual: different endColumnIndex', () => {
  const actual: readonly Diagnostic[] = [createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')]
  const expected: readonly Diagnostic[] = [createDiagnostic(0, 0, 0, 6, 'Syntax error', 'error')]
  expect(areDiagnosticsEqual(actual, expected)).toBe(false)
})

test('areDiagnosticsEqual: different message', () => {
  const actual: readonly Diagnostic[] = [createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')]
  const expected: readonly Diagnostic[] = [createDiagnostic(0, 0, 0, 5, 'Different error', 'error')]
  expect(areDiagnosticsEqual(actual, expected)).toBe(false)
})

test('areDiagnosticsEqual: different type', () => {
  const actual: readonly Diagnostic[] = [createDiagnostic(0, 0, 0, 5, 'Syntax error', 'error')]
  const expected: readonly Diagnostic[] = [createDiagnostic(0, 0, 0, 5, 'Syntax error', 'warning')]
  expect(areDiagnosticsEqual(actual, expected)).toBe(false)
})

test('areDiagnosticsEqual: different order', () => {
  const actual: readonly Diagnostic[] = [createDiagnostic(0, 0, 0, 5, 'First error', 'error'), createDiagnostic(1, 0, 1, 5, 'Second error', 'error')]
  const expected: readonly Diagnostic[] = [
    createDiagnostic(1, 0, 1, 5, 'Second error', 'error'),
    createDiagnostic(0, 0, 0, 5, 'First error', 'error'),
  ]
  expect(areDiagnosticsEqual(actual, expected)).toBe(false)
})
