import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as EditorCompletion from '../src/parts/TestFrameWorkComponentEditorCompletion/TestFrameWorkComponentEditorCompletion.ts'

test('selectIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.selectIndex'() {
      return undefined
    },
  })

  await EditorCompletion.selectIndex(3)

  expect(mockRpc.invocations).toEqual([['EditorCompletion.selectIndex', 3]])
})

test('selectCurrentIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.selectCurrentIndex'() {
      return undefined
    },
  })

  await EditorCompletion.selectCurrentIndex()

  expect(mockRpc.invocations).toEqual([['EditorCompletion.selectCurrentIndex']])
})

test('close', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.close'() {
      return undefined
    },
  })

  await EditorCompletion.close()

  expect(mockRpc.invocations).toEqual([['EditorCompletion.close']])
})

test('handleWheel', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.handleWheel'() {
      return undefined
    },
  })

  await EditorCompletion.handleWheel(0, 100)

  expect(mockRpc.invocations).toEqual([['EditorCompletion.handleWheel', 0, 100]])
})
