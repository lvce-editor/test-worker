import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as StatusBar from '../src/parts/TestFrameWorkComponentStatusBar/TestFrameWorkComponentStatusBar.ts'

test('update calls StatusBar.updateStatusBarItems', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'StatusBar.updateStatusBarItems'() {
      return undefined
    },
  })
  await StatusBar.update()
  expect(mockRpc.invocations).toEqual([['StatusBar.updateStatusBarItems']])
})
