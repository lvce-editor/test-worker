import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as EditorCompletion from '../src/parts/TestFrameWorkComponentEditorCompletion/TestFrameWorkComponentEditorCompletion.ts'

test('selectIndex', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await EditorCompletion.selectIndex(3)

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('EditorCompletion.selectIndex', 3)
})

test('selectCurrentIndex', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await EditorCompletion.selectCurrentIndex()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('EditorCompletion.selectCurrentIndex')
})
