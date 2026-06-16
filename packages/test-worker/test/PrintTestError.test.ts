import { expect, jest, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { ErrorWorker } from '@lvce-editor/rpc-registry'
import * as PrintTestError from '../src/parts/PrintTestError/PrintTestError.js'

test('printTestError prints prepared error', async () => {
  const mockRpc = createMockRpc({
    commandMap: {
      'Errors.prepare'(error: any): any {
        return {
          codeframe: '> 1 | throw new Error("boom")',
          message: error.message,
          stack: error.stack,
        }
      },
    },
  })
  ErrorWorker.set(mockRpc)
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

  const error = new Error('boom')
  await PrintTestError.printTestError(error)

  expect(mockRpc.invocations).toEqual([
    [
      'Errors.prepare',
      error,
      {
        ignoredCodeFrameStackLines: ['testWorkerMain.js', 'testWorkerMain.ts'],
      },
    ],
  ])
  expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
  expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('boom\n> 1 | throw new Error("boom")\nError: boom'))

  consoleErrorSpy.mockRestore()
})

test('printTestError falls back to original error when preparing fails', async () => {
  const mockRpc = createMockRpc({
    commandMap: {
      'Errors.prepare'(): never {
        throw new Error('prepare failed')
      },
    },
  })
  ErrorWorker.set(mockRpc)
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

  const error = new Error('boom')
  await PrintTestError.printTestError(error)

  expect(mockRpc.invocations).toEqual([
    [
      'Errors.prepare',
      error,
      {
        ignoredCodeFrameStackLines: ['testWorkerMain.js', 'testWorkerMain.ts'],
      },
    ],
  ])
  expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
  expect(consoleErrorSpy).toHaveBeenCalledWith(error)

  consoleErrorSpy.mockRestore()
})
