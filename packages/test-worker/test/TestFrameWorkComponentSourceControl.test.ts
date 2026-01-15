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
