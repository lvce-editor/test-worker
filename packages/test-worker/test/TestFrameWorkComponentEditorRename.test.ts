import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as EditorRename from '../src/parts/TestFrameWorkComponentEditorRename/TestFrameWorkComponentEditorRename.ts'

test('handleInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorRename.handleInput'() {
      return undefined
    },
  })

  await EditorRename.handleInput('newName')
  expect(mockRpc.invocations).toEqual([['EditorRename.handleInput', 'newName', 2]])
})

test('accept', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorRename.accept'() {
      return undefined
    },
  })

  await EditorRename.accept()
  expect(mockRpc.invocations).toEqual([['EditorRename.accept']])
})

test('cancel', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorRename.cancel'() {
      return undefined
    },
  })

  await EditorRename.cancel()
  expect(mockRpc.invocations).toEqual([['EditorRename.cancel']])
})
