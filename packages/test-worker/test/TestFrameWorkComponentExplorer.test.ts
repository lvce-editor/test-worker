import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Explorer from '../src/parts/TestFrameWorkComponentExplorer/TestFrameWorkComponentExplorer.ts'

test('openContextMenu', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.handleContextMenuKeyboard'() {
      return undefined
    },
  })

  await Explorer.openContextMenu(5)

  expect(mockRpc.invocations).toEqual([['Explorer.handleContextMenuKeyboard', 5]])
})

test('handleDragLeave', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.handleDragLeave'() {
      return undefined
    },
  })

  await Explorer.handleDragLeave()

  expect(mockRpc.invocations).toEqual([['Explorer.handleDragLeave']])
})

test('handleBlur', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.handleBlur'() {
      return undefined
    },
  })

  await Explorer.handleBlur()

  expect(mockRpc.invocations).toEqual([['Explorer.handleBlur']])
})

test('handleInputBlur', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.handleInputBlur'() {
      return undefined
    },
  })

  await Explorer.handleInputBlur()

  expect(mockRpc.invocations).toEqual([['Explorer.handleInputBlur']])
})

test('focus', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.focusIndex'() {
      return undefined
    },
  })

  await Explorer.focus()

  expect(mockRpc.invocations).toEqual([['Explorer.focusIndex', -1]])
})

test('focusNext', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.focusNext'() {
      return undefined
    },
  })

  await Explorer.focusNext()

  expect(mockRpc.invocations).toEqual([['Explorer.focusNext']])
})

test('selectUp', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.selectUp'() {
      return undefined
    },
  })

  await Explorer.selectUp()

  expect(mockRpc.invocations).toEqual([['Explorer.selectUp']])
})

test('handleDragOverIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.handleDragOverIndex'() {
      return undefined
    },
  })

  await Explorer.handleDragOverIndex(3)

  expect(mockRpc.invocations).toEqual([['Explorer.handleDragOverIndex', 3]])
})

test('selectDown', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.selectDown'() {
      return undefined
    },
  })

  await Explorer.selectDown()

  expect(mockRpc.invocations).toEqual([['Explorer.selectDown']])
})

test('refresh', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.refresh'() {
      return undefined
    },
  })

  await Explorer.refresh()

  expect(mockRpc.invocations).toEqual([['Explorer.refresh']])
})

test('focusIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.focusIndex'() {
      return undefined
    },
  })

  await Explorer.focusIndex(7)

  expect(mockRpc.invocations).toEqual([['Explorer.focusIndex', 7]])
})

test('clickCurrent', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.handleClickCurrent'() {
      return undefined
    },
  })

  await Explorer.clickCurrent()

  expect(mockRpc.invocations).toEqual([['Explorer.handleClickCurrent']])
})

test('handleArrowLeft', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.handleArrowLeft'() {
      return undefined
    },
  })

  await Explorer.handleArrowLeft()

  expect(mockRpc.invocations).toEqual([['Explorer.handleArrowLeft']])
})

test('focusLast', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.focusLast'() {
      return undefined
    },
  })

  await Explorer.focusLast()

  expect(mockRpc.invocations).toEqual([['Explorer.focusLast']])
})

test('focusFirst', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.focusFirst'() {
      return undefined
    },
  })

  await Explorer.focusFirst()

  expect(mockRpc.invocations).toEqual([['Explorer.focusFirst']])
})

test('removeDirent', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.removeDirent'() {
      return undefined
    },
  })

  await Explorer.removeDirent()

  expect(mockRpc.invocations).toEqual([['Explorer.removeDirent']])
})

test('expandRecursively', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.expandRecursively'() {
      return undefined
    },
  })

  await Explorer.expandRecursively()

  expect(mockRpc.invocations).toEqual([['Explorer.expandRecursively']])
})

test('newFile', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.newFile'() {
      return undefined
    },
  })

  await Explorer.newFile()

  expect(mockRpc.invocations).toEqual([['Explorer.newFile']])
})

test('newFolder', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.newFolder'() {
      return undefined
    },
  })

  await Explorer.newFolder()

  expect(mockRpc.invocations).toEqual([['Explorer.newFolder']])
})

test('handleClick', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.handleClick'() {
      return undefined
    },
  })

  await Explorer.handleClick(4)

  expect(mockRpc.invocations).toEqual([['Explorer.handleClick', 4]])
})

test('handleClickAt', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.handleClickAt'() {
      return undefined
    },
  })

  await Explorer.handleClickAt(true, 1, false, true, 100, 200)

  expect(mockRpc.invocations).toEqual([['Explorer.handleClickAt', true, 1, false, true, 100, 200]])
})

test('handleDrop', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.handleDrop'() {
      return undefined
    },
  })

  const fileIds = [1, 2, 3]
  const fileList = [] as readonly File[]

  await Explorer.handleDrop(150, 250, fileIds, fileList)

  expect(mockRpc.invocations).toEqual([['Explorer.handleDrop', 150, 250, fileIds, fileIds]])
})

test('rename', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.renameDirent'() {
      return undefined
    },
  })

  await Explorer.rename()

  expect(mockRpc.invocations).toEqual([['Explorer.renameDirent']])
})

test('selectAll', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.selectAll'() {
      return undefined
    },
  })

  await Explorer.selectAll()

  expect(mockRpc.invocations).toEqual([['Explorer.selectAll']])
})

test('renameDirent', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.renameDirent'() {
      return undefined
    },
  })

  await Explorer.renameDirent()

  expect(mockRpc.invocations).toEqual([['Explorer.renameDirent']])
})

test('cancelEdit', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.cancelEdit'() {
      return undefined
    },
  })

  await Explorer.cancelEdit()

  expect(mockRpc.invocations).toEqual([['Explorer.cancelEdit']])
})

test('acceptEdit', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.acceptEdit'() {
      return undefined
    },
  })

  await Explorer.acceptEdit()

  expect(mockRpc.invocations).toEqual([['Explorer.acceptEdit']])
})

test('updateEditingValue', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.updateEditingValue'() {
      return undefined
    },
  })

  await Explorer.updateEditingValue('new-file-name')

  expect(mockRpc.invocations).toEqual([['Explorer.updateEditingValue', 'new-file-name']])
})

test('expandAll', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.expandAll'() {
      return undefined
    },
  })

  await Explorer.expandAll()

  expect(mockRpc.invocations).toEqual([['Explorer.expandAll']])
})

test('collapseAll', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.collapseAll'() {
      return undefined
    },
  })

  await Explorer.collapseAll()

  expect(mockRpc.invocations).toEqual([['Explorer.collapseAll']])
})

test('handleDragOver', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.handleDragOver'() {
      return undefined
    },
  })

  await Explorer.handleDragOver(120, 180)

  expect(mockRpc.invocations).toEqual([['Explorer.handleDragOver', 120, 180]])
})

test('handleCut', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.handleCut'() {
      return undefined
    },
  })

  await Explorer.handleCut()

  expect(mockRpc.invocations).toEqual([['Explorer.handleCut']])
})

test('handleCopy', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.handleCopy'() {
      return undefined
    },
  })

  await Explorer.handleCopy()

  expect(mockRpc.invocations).toEqual([['Explorer.handleCopy']])
})

test('handlePaste', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.handlePaste'() {
      return undefined
    },
  })

  await Explorer.handlePaste()

  expect(mockRpc.invocations).toEqual([['Explorer.handlePaste']])
})

test('selectIndices', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.selectIndices'() {
      return undefined
    },
  })

  const indices = [0, 2, 4, 6]
  await Explorer.selectIndices(indices)

  expect(mockRpc.invocations).toEqual([['Explorer.selectIndices', indices]])
})

test('toggleIndividualSelection', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Explorer.toggleIndividualSelection'() {
      return undefined
    },
  })

  await Explorer.toggleIndividualSelection(8)

  expect(mockRpc.invocations).toEqual([['Explorer.toggleIndividualSelection', 8]])
})
