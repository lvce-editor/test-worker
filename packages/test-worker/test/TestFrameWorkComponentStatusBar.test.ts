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

test.each([['handleContextMenu', [2, 120, 240]]] as const)('%s forwards arguments to the status bar', async (method, args) => {
  using mockRpc = RendererWorker.registerMockRpc({
    [`StatusBar.${method}`]() {
      return undefined
    },
  })
  const invoke = StatusBar[method] as (...args: readonly any[]) => Promise<void>
  await invoke(...args)
  expect(mockRpc.invocations).toEqual([[`StatusBar.${method}`, ...args]])
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
