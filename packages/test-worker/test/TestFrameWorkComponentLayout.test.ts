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

test('hideSideBar', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.hideSideBar'() {
      return undefined
    },
  })

  await Layout.hideSideBar()
  expect(mockRpc.invocations).toEqual([['Layout.hideSideBar']])
})

test('showSecondarySideBar', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.showSecondarySideBar'() {
      return undefined
    },
  })

  await Layout.showSecondarySideBar()
  expect(mockRpc.invocations).toEqual([['Layout.showSecondarySideBar']])
})

test('hideSecondarySideBar', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.hideSecondarySideBar'() {
      return undefined
    },
  })

  await Layout.hideSecondarySideBar()
  expect(mockRpc.invocations).toEqual([['Layout.hideSecondarySideBar']])
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
