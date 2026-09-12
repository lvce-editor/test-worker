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

test('handleContextMenu forwards button and coordinates', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'StatusBar.handleContextMenu'() {
      return undefined
    },
  })
  await StatusBar.handleContextMenu(2, 120, 240)
  expect(mockRpc.invocations).toEqual([['StatusBar.handleContextMenu', 2, 120, 240]])
})

test('click invokes the item by name', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'StatusBar.handleClick'() {
      return undefined
    },
  })
  await StatusBar.click('Problems')
  expect(mockRpc.invocations).toEqual([['StatusBar.handleClick', 'Problems']])
})
