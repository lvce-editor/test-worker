import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as SourceControl from '../src/parts/TestFrameWorkComponentSourceControl/TestFrameWorkComponentSourceControl.ts'

test('selectIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Source Control.selectIndex'() {
      return undefined
    },
  })

  await SourceControl.selectIndex(2)
  expect(mockRpc.invocations).toEqual([['Source Control.selectIndex', 2]])
})

test('acceptInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Source Control.acceptInput'() {
      return undefined
    },
  })

  await SourceControl.acceptInput()
  expect(mockRpc.invocations).toEqual([['Source Control.acceptInput']])
})

test('handleInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Source Control.handleInput'() {
      return undefined
    },
  })

  await SourceControl.handleInput('feat: message')
  expect(mockRpc.invocations).toEqual([['Source Control.handleInput', 'feat: message', 2]])
})

test('handleClickSourceControlButtons', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Source Control.handleClickSourceControlButtons'() {
      return undefined
    },
  })

  await SourceControl.handleClickSourceControlButtons(1, 'commit')
  expect(mockRpc.invocations).toEqual([['Source Control.handleClickSourceControlButtons', 1, 'commit']])
})

test('handleContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Source Control.handleContextMenu'() {
      return undefined
    },
  })

  await SourceControl.handleContextMenu(2, 100, 200)
  expect(mockRpc.invocations).toEqual([['Source Control.handleContextMenu', 2, 100, 200]])
})

test('show', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.openViewlet'() {
      return undefined
    },
  })

  await SourceControl.show()
  expect(mockRpc.invocations).toEqual([['SideBar.openViewlet', 'Source Control']])
})

test('show with waitUntilReady waits for opening and readiness', async () => {
  const opened = Promise.withResolvers<void>()
  const ready = Promise.withResolvers<void>()
  const readinessRequested = Promise.withResolvers<void>()
  using mockRpc = RendererWorker.registerMockRpc({
    async 'SideBar.openViewlet'() {
      await opened.promise
    },
    async 'Source Control.waitUntilReady'() {
      readinessRequested.resolve()
      await ready.promise
    },
  })
  let completed = false
  const showing = (async (): Promise<void> => {
    await SourceControl.show({ waitUntilReady: true })
    completed = true
  })()
  await Promise.resolve()
  expect(mockRpc.invocations).toEqual([['SideBar.openViewlet', 'Source Control']])
  expect(completed).toBe(false)
  opened.resolve()
  await readinessRequested.promise
  expect(completed).toBe(false)
  ready.resolve()
  await showing
  expect(completed).toBe(true)
  expect(mockRpc.invocations).toEqual([['SideBar.openViewlet', 'Source Control'], ['Source Control.waitUntilReady']])
})

test('show with waitUntilReady false only opens the view', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.openViewlet'() {},
  })
  await SourceControl.show({ waitUntilReady: false })
  expect(mockRpc.invocations).toEqual([['SideBar.openViewlet', 'Source Control']])
})

test('show propagates readiness failures', async () => {
  const error = new Error('Source control view was disposed')
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.openViewlet'() {},
    'Source Control.waitUntilReady'() {
      throw error
    },
  })
  await expect(SourceControl.show({ waitUntilReady: true })).rejects.toBe(error)
  expect(mockRpc.invocations).toHaveLength(2)
})

test('revealInExplorer', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Source Control.revealInExplorer'() {},
  })
  await SourceControl.revealInExplorer('/workspace/test.css')
  expect(mockRpc.invocations).toEqual([['Source Control.revealInExplorer', '/workspace/test.css']])
})
