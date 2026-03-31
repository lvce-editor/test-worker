import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Layout from '../src/parts/TestFrameWorkComponentLayout/TestFrameWorkComponentLayout.ts'

test('showSideBar', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.showSideBar'() {
      return undefined
    },
  })

  await Layout.showSideBar()
  expect(mockRpc.invocations).toEqual([['Layout.showSideBar']])
})

test('handleWorkspaceRefresh', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.handleWorkspaceRefresh'() {
      return undefined
    },
  })

  await Layout.handleWorkspaceRefresh()
  expect(mockRpc.invocations).toEqual([['Layout.handleWorkspaceRefresh']])
})