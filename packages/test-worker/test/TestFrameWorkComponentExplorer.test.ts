import { beforeEach, expect, jest, test } from '@jest/globals'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as Explorer from '../src/parts/TestFrameWorkComponentExplorer/TestFrameWorkComponentExplorer.ts'

const mockInvoke = jest.fn()

const mockRpc = {
  invoke: mockInvoke,
} as any

beforeEach(() => {
  ParentRpc.set(mockRpc)
  mockInvoke.mockReset()
})

test('openContextMenu', async () => {
  await Explorer.openContextMenu(1)
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleContextMenuKeyboard', 1)
})

test('focus', async () => {
  await Explorer.focus()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.focusIndex', -1)
})

test('focusNext', async () => {
  await Explorer.focusNext()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.focusNext')
})

test('focusIndex', async () => {
  await Explorer.focusIndex(1)
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.focusIndex', 1)
})

test('clickCurrent', async () => {
  await Explorer.clickCurrent()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleClickCurrent')
})

test('handleArrowLeft', async () => {
  await Explorer.handleArrowLeft()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleArrowLeft')
})

test('focusLast', async () => {
  await Explorer.focusLast()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.focusLast')
})

test('focusFirst', async () => {
  await Explorer.focusFirst()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.focusFirst')
})

test('removeDirent', async () => {
  await Explorer.removeDirent()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.removeDirent')
})

test('expandRecursively', async () => {
  await Explorer.expandRecursively()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.expandRecursively')
})

test('newFile', async () => {
  await Explorer.newFile()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.newFile')
})

test('handleClick', async () => {
  await Explorer.handleClick(1)
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.handleClick', 1)
})

test('rename', async () => {
  await Explorer.rename()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.renameDirent')
})

test('cancelEdit', async () => {
  await Explorer.cancelEdit()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.cancelEdit')
})

test('acceptEdit', async () => {
  await Explorer.acceptEdit()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.acceptEdit')
})

test('updateEditingValue', async () => {
  await Explorer.updateEditingValue('test.txt')
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.updateEditingValue', 'test.txt')
})

test('expandAll', async () => {
  await Explorer.expandAll()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Explorer.expandAll')
})
