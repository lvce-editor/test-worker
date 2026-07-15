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

test('getSideBarVisible', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getSideBarVisible'() {
      return true
    },
  })

  const sideBarVisible = await Layout.getSideBarVisible()
  expect(sideBarVisible).toBe(true)
  expect(mockRpc.invocations).toEqual([['Layout.getSideBarVisible']])
})

test('waitForSideBarVisible', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getSideBarVisible'() {
      return true
    },
  })

  await Layout.waitForSideBarVisible(true)
  expect(mockRpc.invocations).toEqual([['Layout.getSideBarVisible']])
})

test('waitForSideBarVisible retries', async () => {
  let invocationCount = 0
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getSideBarVisible'() {
      invocationCount++
      return invocationCount === 2
    },
  })

  await Layout.waitForSideBarVisible(true)
  expect(mockRpc.invocations).toEqual([['Layout.getSideBarVisible'], ['Layout.getSideBarVisible']])
})

test('waitForSideBarVisible throws when the expected visibility is not reached', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getSideBarVisible'() {
      return false
    },
  })

  await expect(Layout.waitForSideBarVisible(true)).rejects.toThrow('expected sidebar visibility to be true but was false')
  expect(mockRpc.invocations).toHaveLength(21)
})

test('getSideBarPosition', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getSideBarPosition'() {
      return 2
    },
  })

  const sideBarPosition = await Layout.getSideBarPosition()
  expect(sideBarPosition).toBe(2)
  expect(mockRpc.invocations).toEqual([['Layout.getSideBarPosition']])
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
