import { expect, test } from '@jest/globals'
import { AssertionError } from '../src/parts/AssertionError/AssertionError.ts'

test('AssertionError sets message and name', () => {
  const error: AssertionError = new AssertionError('failed')
  expect(error).toBeInstanceOf(AssertionError)
  expect(error).toBeInstanceOf(Error)
  expect(error.message).toBe('failed')
  expect(error.name).toBe('AssertionError')
})
