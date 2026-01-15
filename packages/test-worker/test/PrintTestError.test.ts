import { expect, jest, test } from '@jest/globals'
import * as PrintTestError from '../src/parts/PrintTestError/PrintTestError.js'

test('printTestError calls console.error', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

  const error = new Error('boom')
  await PrintTestError.printTestError(error)

  expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
  expect(consoleErrorSpy).toHaveBeenCalledWith(error)

  consoleErrorSpy.mockRestore()
})
