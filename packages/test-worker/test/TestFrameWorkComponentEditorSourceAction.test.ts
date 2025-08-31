import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as EditorSourceAction from '../src/parts/TestFrameWorkComponentEditorSourceAction/TestFrameWorkComponentEditorSourceAction.ts'

const setup = (): jest.Mock => {
  const invoke: jest.Mock = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke })
  RendererWorker.set(mockRpc)
  return invoke
}

test('selectIndex', async () => {
  const invoke = setup()
  await EditorSourceAction.selectIndex(3)
  expect(invoke).toHaveBeenCalledWith('EditorSourceAction.selectIndex', 3)
})

test('selectCurrentIndex', async () => {
  const invoke = setup()
  await EditorSourceAction.selectCurrentIndex()
  expect(invoke).toHaveBeenCalledWith('EditorSourceAction.selectCurrentIndex')
})
