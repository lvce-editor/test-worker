import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Problems from '../src/parts/TestFrameWorkComponentProblems/TestFrameWorkComponentProblems.ts'

test('show', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Panel.selectIndex'() {
      return undefined
    },
  })

  await Problems.show()

  expect(mockRpc.invocations).toEqual([['Panel.selectIndex', 0]])
})

test('handleActiveEditorChange', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Problems.handleActiveEditorChange'() {
      return undefined
    },
  })

  await Problems.handleActiveEditorChange('file:///test.txt')

  expect(mockRpc.invocations).toEqual([['Problems.handleActiveEditorChange', 'file:///test.txt']])
})

test('handleBlur', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Problems.handleBlur'() {
      return undefined
    },
  })

  await Problems.handleBlur()

  expect(mockRpc.invocations).toEqual([['Problems.handleBlur']])
})

test('handleClickMoreFilters', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Problems.handleClickMoreFilters'() {
      return undefined
    },
  })

  await Problems.handleClickMoreFilters(100, 200)

  expect(mockRpc.invocations).toEqual([['Problems.handleClickMoreFilters', 100, 200]])
})

test('handleContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Problems.handleContextMenu'() {
      return undefined
    },
  })

  await Problems.handleContextMenu(100, 200)

  expect(mockRpc.invocations).toEqual([['Problems.handleContextMenu', 100, 200]])
})

test('handleFilterInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Problems.handleFilterInput'() {
      return undefined
    },
  })

  await Problems.handleFilterInput('test filter')

  expect(mockRpc.invocations).toEqual([['Problems.handleFilterInput', 'test filter', 2]])
})

test('copyMessage', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Problems.copyMessage'() {
      return undefined
    },
  })

  await Problems.copyMessage()

  expect(mockRpc.invocations).toEqual([['Problems.copyMessage']])
})

test('focusIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Problems.focusIndex'() {
      return undefined
    },
  })

  await Problems.focusIndex(5)

  expect(mockRpc.invocations).toEqual([['Problems.focusIndex', 5]])
})

test('handleArrowLeft', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Problems.handleArrowLeft'() {
      return undefined
    },
  })

  await Problems.handleArrowLeft()

  expect(mockRpc.invocations).toEqual([['Problems.handleArrowLeft']])
})

test('handleArrowRight', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Problems.handleArrowRight'() {
      return undefined
    },
  })

  await Problems.handleArrowRight()

  expect(mockRpc.invocations).toEqual([['Problems.handleArrowRight']])
})

test('handleClickAt', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Problems.handleClickAt'() {
      return undefined
    },
  })

  await Problems.handleClickAt(100, 200)

  expect(mockRpc.invocations).toEqual([['Problems.handleClickAt', 100, 200]])
})

test('handleIconThemeChange', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Problems.handleIconThemeChange'() {
      return undefined
    },
  })

  await Problems.handleIconThemeChange()

  expect(mockRpc.invocations).toEqual([['Problems.handleIconThemeChange']])
})

test('viewAsList', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Problems.viewAsList'() {
      return undefined
    },
  })

  await Problems.viewAsList()

  expect(mockRpc.invocations).toEqual([['Problems.viewAsList']])
})

test('viewAsTable', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Problems.viewAsTable'() {
      return undefined
    },
  })

  await Problems.viewAsTable()

  expect(mockRpc.invocations).toEqual([['Problems.viewAsTable']])
})
