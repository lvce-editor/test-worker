import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Settings from '../src/parts/TestFrameWorkComponentSettings/TestFrameWorkComponentSettings.ts'

test('update', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.update'() {
      return undefined
    },
  })

  const testSettings = { 'editor.fontSize': 14, 'editor.tabSize': 2 }
  await Settings.update(testSettings)

  expect(mockRpc.invocations).toEqual([['Preferences.update', testSettings]])
})
