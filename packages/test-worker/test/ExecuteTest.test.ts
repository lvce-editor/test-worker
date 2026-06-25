import { afterEach, expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as AutoFixState from '../src/parts/AutoFixState/AutoFixState.ts'

const executeTest2 = jest.fn(async (_name: string, _fn: any, _globals: any, _timestamp: () => number): Promise<any> => undefined)
const printTestError = jest.fn(async (_error: unknown) => undefined)

jest.unstable_mockModule('../src/parts/ExecuteTest2/ExecuteTest2.ts', () => ({
  executeTest2,
}))

jest.unstable_mockModule('../src/parts/PrintTestError/PrintTestError.ts', () => ({
  printTestError,
}))

const { executeTest } = await import('../src/parts/ExecuteTest/ExecuteTest.ts')

afterEach(() => {
  AutoFixState.clear()
  executeTest2.mockReset()
  printTestError.mockClear()
  jest.restoreAllMocks()
})

test('executeTest shows pass overlay when test succeeds', async () => {
  executeTest2.mockResolvedValue({
    autoFixError: undefined,
    background: 'green',
    error: undefined,
    formattedDuration: '1.00ms',
    overlayActions: undefined,
    text: 'test passed in 1.00ms',
    type: 'pass',
  })
  const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})

  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.showOverlay'() {
      return undefined
    },
  })

  await executeTest('sample-test', async () => undefined, { BaseUrl: {} })

  expect(executeTest2).toHaveBeenCalledWith('sample-test', expect.any(Function), { BaseUrl: {} }, expect.any(Function))
  expect(printTestError).not.toHaveBeenCalled()
  expect(consoleInfoSpy).toHaveBeenCalledWith('PASS sample-test in 1.00ms')
  expect(mockRpc.invocations).toEqual([['TestFrameWork.showOverlay', 'pass', 'green', 'test passed in 1.00ms']])
})

test('executeTest prints failures and stores autofix state', async () => {
  const error = new Error('boom')
  const autoFixError = {
    actualPayload: { actual: true },
    code: 'chat-debug.should-have-payload',
    expectedPayload: { expected: true },
  }
  executeTest2.mockResolvedValue({
    autoFixError,
    background: 'red',
    error,
    formattedDuration: '2.00ms',
    overlayActions: undefined,
    text: 'test failed: Error: boom',
    type: 'fail',
  })

  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.showOverlay'() {
      return undefined
    },
  })

  await executeTest('failing-test', async () => undefined)

  expect(printTestError).toHaveBeenCalledWith(error)
  expect(AutoFixState.get()).toBe(autoFixError)
  expect(mockRpc.invocations).toEqual([['TestFrameWork.showOverlay', 'fail', 'red', 'test failed: Error: boom']])
})

test('executeTest forwards overlay actions', async () => {
  const overlayActions = [
    {
      command: 'Test.tryAutoFix',
      id: 'autofix',
      label: 'Autofix',
    },
  ]
  executeTest2.mockResolvedValue({
    autoFixError: undefined,
    background: 'red',
    error: new Error('boom'),
    formattedDuration: '3.00ms',
    overlayActions,
    text: 'test failed: Error: boom',
    type: 'fail',
  })

  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.showOverlay'() {
      return undefined
    },
  })

  await executeTest('action-test', async () => undefined)

  expect(mockRpc.invocations).toEqual([['TestFrameWork.showOverlay', 'fail', 'red', 'test failed: Error: boom', overlayActions]])
})
