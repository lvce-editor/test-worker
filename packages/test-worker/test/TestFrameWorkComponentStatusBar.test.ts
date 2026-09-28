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

test('createItemRight forwards the item', async () => {
  const item = {
    ariaLabel: 'test.item',
    elements: [{ type: 'text' as const, value: 'test.item' }],
    name: 'test.item',
    tooltip: 'test.item',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'StatusBar.itemRightCreate'() {
      return undefined
    },
  })
  await StatusBar.createItemRight(item)
  expect(mockRpc.invocations).toEqual([['StatusBar.itemRightCreate', item]])
})

test('updateItemRight forwards the item', async () => {
  const item = {
    ariaLabel: 'test.item',
    elements: [{ type: 'text' as const, value: 'test.item' }],
    name: 'test.item',
    tooltip: 'test.item',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'StatusBar.itemRightUpdate'() {
      return undefined
    },
  })
  await StatusBar.updateItemRight(item)
  expect(mockRpc.invocations).toEqual([['StatusBar.itemRightUpdate', item]])
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
