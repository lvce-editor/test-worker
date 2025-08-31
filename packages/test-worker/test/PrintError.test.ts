import { expect, jest, test } from '@jest/globals'
import { AssertionError } from '../src/parts/AssertionError/AssertionError.ts'
import * as PrintError from '../src/parts/PrintError/PrintError.ts'

test('printError logs Error object as-is', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  const error = new Error('boom')
  PrintError.printError(error)
  expect(spy).toHaveBeenCalledTimes(1)
  expect(spy).toHaveBeenCalledWith(error)
  spy.mockRestore()
})

test('printError logs only message for AssertionError', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  const error = new AssertionError('failed')
  PrintError.printError(error)
  expect(spy).toHaveBeenCalledTimes(1)
  expect(spy).toHaveBeenCalledWith('failed')
  spy.mockRestore()
})

test('printError logs strings directly', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  PrintError.printError('bad')
  expect(spy).toHaveBeenCalledTimes(1)
  expect(spy).toHaveBeenCalledWith('bad')
  spy.mockRestore()
})
