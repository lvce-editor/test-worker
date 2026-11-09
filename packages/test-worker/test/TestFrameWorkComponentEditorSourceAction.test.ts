import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as EditorSourceAction from '../src/parts/TestFrameWorkComponentEditorSourceAction/TestFrameWorkComponentEditorSourceAction.ts'

test('selectIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorSourceAction.selectIndex'() {
      return undefined
    },
  })
  await EditorSourceAction.selectIndex(3)
  expect(mockRpc.invocations).toEqual([['EditorSourceAction.selectIndex', 3]])
})

test('selectItem', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorSourceAction.selectItem'() {
      return undefined
    },
  })
  await EditorSourceAction.selectItem('Organize Imports')
  expect(mockRpc.invocations).toEqual([['EditorSourceAction.selectItem', 'Organize Imports']])
})

test('selectItem propagates errors', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorSourceAction.selectItem'() {
      throw new Error('source action failed')
    },
  })
  await expect(EditorSourceAction.selectItem('Organize Imports')).rejects.toThrow('source action failed')
  expect(mockRpc.invocations).toEqual([['EditorSourceAction.selectItem', 'Organize Imports']])
})

test('selectCurrentIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorSourceAction.selectCurrentIndex'() {
      return undefined
    },
  })
  await EditorSourceAction.selectCurrentIndex()
  expect(mockRpc.invocations).toEqual([['EditorSourceAction.selectCurrentIndex']])
})
