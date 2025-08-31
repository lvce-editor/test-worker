import { expect, test } from '@jest/globals'
import * as CreateId from '../src/parts/CreateId/CreateId.ts'

test('createId returns number between 0 and 1', () => {
  const id: number = CreateId.createId()
  expect(typeof id).toBe('number')
  expect(id).toBeGreaterThanOrEqual(0)
  expect(id).toBeLessThan(1)
})
