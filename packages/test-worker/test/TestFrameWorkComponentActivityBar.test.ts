import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ActivityBar from '../src/parts/TestFrameWorkComponentActivityBar/TestFrameworkComponentActivityBar.ts'

test('focus', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.focus'() {
      return undefined
    },
  })

  await ActivityBar.focus()
  expect(mockRpc.invocations).toEqual([['ActivityBar.focus']])
})

test('focusFirst', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.focusFirst'() {
      return undefined
    },
  })

  await ActivityBar.focusFirst()
  expect(mockRpc.invocations).toEqual([['ActivityBar.focusFirst']])
})

test('focusLast', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.focusLast'() {
      return undefined
    },
  })

  await ActivityBar.focusLast()
  expect(mockRpc.invocations).toEqual([['ActivityBar.focusLast']])
})

test('focusNext', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.focusNext'() {
      return undefined
    },
  })

  await ActivityBar.focusNext()
  expect(mockRpc.invocations).toEqual([['ActivityBar.focusNext']])
})

test('focusPrevious', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.focusPrevious'() {
      return undefined
    },
  })

  await ActivityBar.focusPrevious()
  expect(mockRpc.invocations).toEqual([['ActivityBar.focusPrevious']])
})

test('handleClick', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.handleClick'() {
      return undefined
    },
  })

  await ActivityBar.handleClick(1)
  expect(mockRpc.invocations).toEqual([['ActivityBar.handleClick', 1]])
})

test('handleContextMenu', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.handleContextMenu'() {
      return undefined
    },
  })

  await ActivityBar.handleContextMenu()
  expect(mockRpc.invocations).toEqual([['ActivityBar.handleContextMenu']])
})

test('selectCurrent', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ActivityBar.selectCurrent'() {
      return undefined
    },
  })

  await ActivityBar.selectCurrent()
  expect(mockRpc.invocations).toEqual([['ActivityBar.selectCurrent']])
})
