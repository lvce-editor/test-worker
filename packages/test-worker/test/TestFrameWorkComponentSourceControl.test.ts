import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as SourceControl from '../src/parts/TestFrameWorkComponentSourceControl/TestFrameWorkComponentSourceControl.ts'



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
