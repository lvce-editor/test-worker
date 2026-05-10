import { expect, test } from '@jest/globals'
import * as BaseUrl from '../src/parts/TestFrameWorkComponentBaseUrl/TestFrameWorkComponentBaseUrl.ts'

test('getBaseUrl returns empty string by default', () => {
  expect(BaseUrl.getBaseUrl()).toBe('')
})
