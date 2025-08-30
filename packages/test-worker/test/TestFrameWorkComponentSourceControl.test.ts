import { beforeEach, expect, jest, test } from '@jest/globals'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import * as SourceControl from '../src/parts/TestFrameWorkComponentSourceControl/TestFrameWorkComponentSourceControl.ts'

const mockInvoke = jest.fn()

const mockRpc = {
  invoke: mockInvoke,
} as any

beforeEach(() => {
  ParentRpc.set(mockRpc)
  mockInvoke.mockReset()
})

test('selectIndex', async () => {
  await SourceControl.selectIndex(2)
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Source Control.selectIndex')
})

test('acceptInput', async () => {
  await SourceControl.acceptInput()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Source Control.acceptInput')
})

test('handleInput', async () => {
  await SourceControl.handleInput('feat: message')
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Source Control.handleInput', 'feat: message')
})

test('handleClickSourceControlButtons', async () => {
  await SourceControl.handleClickSourceControlButtons(1, 'commit')
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Source Control.handleClickSourceControlButtons', 1, 'commit')
})
