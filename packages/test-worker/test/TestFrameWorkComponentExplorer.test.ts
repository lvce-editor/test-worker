import { test, jest, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Explorer from '../src/parts/TestFrameWorkComponentExplorer/TestFrameWorkComponentExplorer.ts'

test('openContextMenu', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.openContextMenu(5)

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleContextMenuKeyboard', 5)
})

test('handleDragLeave', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.handleDragLeave()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleDragLeave')
})

test('handleBlur', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.handleBlur()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleBlur')
})

test('handleInputBlur', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.handleInputBlur()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleInputBlur')
})

test('focus', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.focus()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.focusIndex', -1)
})

test('focusNext', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.focusNext()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.focusNext')
})

test('selectUp', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.selectUp()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.selectUp')
})

test('handleDragOverIndex', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.handleDragOverIndex(3)

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleDragOverIndex', 3)
})

test('selectDown', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.selectDown()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.selectDown')
})

test('refresh', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.refresh()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.refresh')
})

test('focusIndex', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.focusIndex(7)

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.focusIndex', 7)
})

test('clickCurrent', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.clickCurrent()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleClickCurrent')
})

test('handleArrowLeft', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.handleArrowLeft()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleArrowLeft')
})

test('focusLast', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.focusLast()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.focusLast')
})

test('focusFirst', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.focusFirst()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.focusFirst')
})

test('removeDirent', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.removeDirent()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.removeDirent')
})

test('expandRecursively', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.expandRecursively()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.expandRecursively')
})

test('newFile', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.newFile()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.newFile')
})

test('newFolder', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.newFolder()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.newFolder')
})

test('handleClick', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.handleClick(4)

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleClick', 4)
})

test('handleClickAt', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.handleClickAt(true, 1, false, true, 100, 200)

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleClickAt', true, 1, false, true, 100, 200)
})

test('handleDrop', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  const fileIds = [1, 2, 3]
  const fileList = [] as readonly File[]

  await Explorer.handleDrop(150, 250, fileIds, fileList)

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleDrop', 150, 250, fileIds, fileIds)
})

test('rename', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.rename()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.renameDirent')
})

test('selectAll', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.selectAll()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.selectAll')
})

test('renameDirent', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.renameDirent()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.renameDirent')
})

test('cancelEdit', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.cancelEdit()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.cancelEdit')
})

test('acceptEdit', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.acceptEdit()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.acceptEdit')
})

test('updateEditingValue', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.updateEditingValue('new-file-name')

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.updateEditingValue', 'new-file-name')
})

test('expandAll', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.expandAll()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.expandAll')
})

test('handleDragOver', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.handleDragOver(120, 180)

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleDragOver', 120, 180)
})

test('handleCut', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.handleCut()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleCut')
})

test('handleCopy', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.handleCopy()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleCopy')
})

test('handlePaste', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.handlePaste()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handlePaste')
})

test('selectIndices', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  const indices = [0, 2, 4, 6]
  await Explorer.selectIndices(indices)

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.selectIndices', indices)
})

test('toggleIndividualSelection', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Explorer.toggleIndividualSelection(8)

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.toggleIndividualSelection', 8)
})
