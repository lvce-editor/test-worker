import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as EditorSourceAction from '../src/parts/TestFrameWorkComponentEditorSourceAction/TestFrameWorkComponentEditorSourceAction.ts'

test('selectIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'EditorSourceAction.selectIndex'() {
      return undefined
    },
  })
  await EditorSourceAction.selectIndex(3)
  expect(mockRpc.invocations).toEqual([['EditorSourceAction.selectIndex', 3]])
})

test('selectCurrentIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'EditorSourceAction.selectCurrentIndex'() {
      return undefined
    },
  })
  await EditorSourceAction.selectCurrentIndex()
  expect(mockRpc.invocations).toEqual([['EditorSourceAction.selectCurrentIndex']])
})
