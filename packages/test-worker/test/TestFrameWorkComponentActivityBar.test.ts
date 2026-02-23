import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ActivityBar from '../src/parts/TestFrameWorkComponentActivityBar/TestFrameworkComponentActivityBar.ts'

test('focus', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.focus'() {
      return undefined
    },
  })

  await ActivityBar.focus()
  expect(mockRpc.invocations).toEqual([['ActivityBar.focus']])
})

test('toggleActivityBarItem', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.toggleActivityBarItem'() {
      return undefined
    },
  })

  await ActivityBar.toggleActivityBarItem('explorer')
  expect(mockRpc.invocations).toEqual([['ActivityBar.toggleActivityBarItem', 'explorer']])
})

test('focusFirst', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.focusFirst'() {
      return undefined
    },
  })

  await ActivityBar.focusFirst()
  expect(mockRpc.invocations).toEqual([['ActivityBar.focusFirst']])
})

test('setAccountEnabled', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.setAccountEnabled'() {
      return undefined
    },
  })

  await ActivityBar.setAccountEnabled(true)
  expect(mockRpc.invocations).toEqual([['ActivityBar.setAccountEnabled', true]])
})

test('focusLast', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.focusLast'() {
      return undefined
    },
  })

  await ActivityBar.focusLast()
  expect(mockRpc.invocations).toEqual([['ActivityBar.focusLast']])
})

test('focusNext', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.focusNext'() {
      return undefined
    },
  })

  await ActivityBar.focusNext()
  expect(mockRpc.invocations).toEqual([['ActivityBar.focusNext']])
})

test('focusPrevious', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.focusPrevious'() {
      return undefined
    },
  })

  await ActivityBar.focusPrevious()
  expect(mockRpc.invocations).toEqual([['ActivityBar.focusPrevious']])
})

test('handleClick', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.handleClick'() {
      return undefined
    },
  })

  await ActivityBar.handleClick(1)
  expect(mockRpc.invocations).toEqual([['ActivityBar.handleClick', 1]])
})

test('handleContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.handleContextMenu'() {
      return undefined
    },
  })

  await ActivityBar.handleContextMenu()
  expect(mockRpc.invocations).toEqual([['ActivityBar.handleContextMenu']])
})

test('setUpdateState', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.setUpdateState'() {
      return undefined
    },
  })

  await ActivityBar.setUpdateState({
    progress: 1,
    state: 2,
  })
  expect(mockRpc.invocations).toEqual([
    [
      'ActivityBar.setUpdateState',
      {
        progress: 1,
        state: 2,
      },
    ],
  ])
})

test('selectCurrent', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.selectCurrent'() {
      return undefined
    },
  })

  await ActivityBar.selectCurrent()
  expect(mockRpc.invocations).toEqual([['ActivityBar.selectCurrent']])
})

test('handleClickSettings', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.handleClickSettings'() {
      return undefined
    },
  })

  await ActivityBar.handleClickSettings(100, 200)
  expect(mockRpc.invocations).toEqual([['ActivityBar.handleClickSettings', 100, 200]])
})
