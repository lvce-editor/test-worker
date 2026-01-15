import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as SideBar from '../src/parts/TestFrameWorkComponentSideBar/TestFrameWorkComponentSideBar.ts'

test('open', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.openViewlet'() {
      return undefined
    },
  })

  await SideBar.open('test-id')
  expect(mockRpc.invocations).toEqual([['SideBar.openViewlet', 'test-id']])
})

test('hide', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.hideSideBar'() {
      return undefined
    },
  })

  await SideBar.hide()
  expect(mockRpc.invocations).toEqual([['Layout.hideSideBar']])
})
