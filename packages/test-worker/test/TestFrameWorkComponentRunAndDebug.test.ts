import { beforeEach, expect, jest, test } from '@jest/globals'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import * as RunAndDebug from '../src/parts/TestFrameWorkComponentRunAndDebug/TestFrameWorkComponentRunAndDebug.ts'

const mockInvoke = jest.fn()

const mockRpc = {
  invoke: mockInvoke,
} as any

beforeEach(() => {
  ParentRpc.set(mockRpc)
  mockInvoke.mockReset()
})

test('handleClickSectionWatch', async () => {
  await RunAndDebug.handleClickSectionWatch()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Run And Debug.handleClickSectionWatch')
})

test('addWatchExpression', async () => {
  await RunAndDebug.addWatchExpression('a + b')
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Run And Debug.addWatchExpression', 'a + b')
})

test('handleWatchValueChange', async () => {
  await RunAndDebug.handleWatchValueChange()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Run And Debug.handleWatchValueChange')
})

test('acceptWatchExpressionEdit', async () => {
  await RunAndDebug.acceptWatchExpressionEdit()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Run And Debug.acceptWatchExpressionEdit')
})

test('selectIndex', async () => {
  await RunAndDebug.selectIndex(3)
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Run And Debug.selectIndex', 3)
})

test('setPauseOnExceptions', async () => {
  await RunAndDebug.setPauseOnExceptions(1)
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Run And Debug.setPauseOnExceptions', 1)
})

test('handleRename', async () => {
  await RunAndDebug.handleRename()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Run And Debug.handleRename')
})

test('handleSpace', async () => {
  await RunAndDebug.handleSpace()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Run And Debug.handleSpace')
})
