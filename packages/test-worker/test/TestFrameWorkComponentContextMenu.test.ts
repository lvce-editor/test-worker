import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ContextMenu from '../src/parts/TestFrameWorkComponentContextMenu/TestFrameWorkComponentContextMenu.ts'

test('selectIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Menu.selectIndex'() {
      return undefined
    },
  })
  await ContextMenu.selectIndex(0, 2)
  expect(mockRpc.invocations).toEqual([['Menu.selectIndex', 0, 2]])
})

test('selectItem', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Menu.selectItem'() {
      return undefined
    },
  })

  await ContextMenu.selectItem('test item')
  expect(mockRpc.invocations).toEqual([['Menu.selectItem', 'test item']])
})
