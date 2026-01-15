import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as EditorHover from '../src/parts/TestFrameWorkComponentEditorHover/TestFrameWorkComponentEditorHover.ts'

test('show', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.showHover2'() {
      return undefined
    },
  })

  await EditorHover.show()

  expect(mockRpc.invocations).toEqual([['Editor.showHover2']])
})

test('close', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'EditorHover.close'() {
      return undefined
    },
  })

  await EditorHover.close()

  expect(mockRpc.invocations).toEqual([['EditorHover.close']])
})
