import { expect, test } from '@jest/globals'
import * as FormatDuration from '../src/parts/FormatDuration/FormatDuration.ts'

test('formatDuration formats with two decimals', () => {
  expect(FormatDuration.formatDuration(0)).toBe('0.00ms')
  expect(FormatDuration.formatDuration(1)).toBe('1.00ms')
  expect(FormatDuration.formatDuration(12.3456)).toBe('12.35ms')
})
