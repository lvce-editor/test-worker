import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ContextMenu from '../src/parts/TestFrameWorkComponentContextMenu/TestFrameWorkComponentContextMenu.ts'



test('selectItem', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Menu.selectItem'() {
      return undefined
    },
  })

  await ContextMenu.selectItem('test item')
  expect(mockRpc.invocations).toEqual([['Menu.selectItem', 'test item']])
})
