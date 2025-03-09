import { test, expect, beforeEach, jest } from '@jest/globals'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as Explorer from '../src/parts/TestFrameWorkComponentExplorer/TestFrameWorkComponentExplorer.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

beforeEach(() => {
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)
  mockRpc.invoke.mockReset()
})

test('openContextMenu', async () => {
  await Explorer.openContextMenu(1)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.handleContextMenuKeyboard', 1)
})

test('focus', async () => {
  await Explorer.focus()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.focusIndex', -1)
})

test('focusNext', async () => {
  await Explorer.focusNext()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.focusNext')
})

test('focusIndex', async () => {
  await Explorer.focusIndex(1)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.focusIndex', 1)
})

test('clickCurrent', async () => {
  await Explorer.clickCurrent()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.handleClickCurrent')
})

test('handleArrowLeft', async () => {
  await Explorer.handleArrowLeft()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.handleArrowLeft')
})

test('focusLast', async () => {
  await Explorer.focusLast()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.focusLast')
})

test('focusFirst', async () => {
  await Explorer.focusFirst()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.focusFirst')
})

test('removeDirent', async () => {
  await Explorer.removeDirent()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.removeDirent')
})

test('expandRecursively', async () => {
  await Explorer.expandRecursively()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.expandRecursively')
})

test('newFile', async () => {
  await Explorer.newFile()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.newFile')
})

test('handleClick', async () => {
  await Explorer.handleClick(1)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.handleClick', 1)
})

test('rename', async () => {
  await Explorer.rename()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.rename')
})

test('cancelEdit', async () => {
  await Explorer.cancelEdit()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.cancelEdit')
})

test('acceptEdit', async () => {
  await Explorer.acceptEdit()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.acceptEdit')
})

test('updateEditingValue', async () => {
  await Explorer.updateEditingValue('test.txt')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.updateEditingValue', 'test.txt')
})

test('expandAll', async () => {
  await Explorer.expandAll()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Explorer.expandAll')
})
