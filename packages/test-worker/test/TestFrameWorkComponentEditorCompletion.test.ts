import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as EditorCompletion from '../src/parts/TestFrameWorkComponentEditorCompletion/TestFrameWorkComponentEditorCompletion.ts'

test('selectIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.selectIndex'() {
      return undefined
    },
  })

  await EditorCompletion.selectIndex(3)

  expect(mockRpc.invocations).toEqual([['EditorCompletion.selectIndex', 3]])
})

test('selectCurrentIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.selectCurrentIndex'() {
      return undefined
    },
  })

  await EditorCompletion.selectCurrentIndex()

  expect(mockRpc.invocations).toEqual([['EditorCompletion.selectCurrentIndex']])
})

test('close', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.close'() {
      return undefined
    },
  })

  await EditorCompletion.close()

  expect(mockRpc.invocations).toEqual([['EditorCompletion.close']])
})

test('handleWheel', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.handleWheel'() {
      return undefined
    },
  })

  await EditorCompletion.handleWheel(0, 100)

  expect(mockRpc.invocations).toEqual([['EditorCompletion.handleWheel', 0, 100]])
})

test('handlePointerdown', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorCompletion.handlePointerdown'() {
      return undefined
    },
  })

  await EditorCompletion.handlePointerdown(150, 200)

  expect(mockRpc.invocations).toEqual([['EditorCompletion.handlePointerdown', 150, 200]])
})
