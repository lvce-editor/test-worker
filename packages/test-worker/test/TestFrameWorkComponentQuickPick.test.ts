import { beforeEach, test, expect, jest } from '@jest/globals'
import * as ParentRpc from '../src/parts/RendererWorker/RendererWorker.ts'
import * as QuickPick from '../src/parts/TestFrameWorkComponentQuickPick/TestFrameWorkComponentQuickPick.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

beforeEach(() => {
  ParentRpc.set(mockRpc)
  mockRpc.invoke.mockReset()
})

test('open', async () => {
  await QuickPick.open()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Viewlet.openWidget', 'QuickPick', 'everything')
})

test('handleInput', async () => {
  await QuickPick.handleInput('test')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('QuickPick.handleInput', 'test', 0)
})

test('handleClickAt', async () => {
  await QuickPick.handleClickAt(100, 200)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('QuickPick.handleClickAt', 100, 200)
})

test('setValue', async () => {
  await QuickPick.setValue('test')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('QuickPick.setValue', 'test')
})

test('focusNext', async () => {
  await QuickPick.focusNext()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('QuickPick.focusNext')
})

test('focusFirst', async () => {
  await QuickPick.focusFirst()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('QuickPick.focusFirst')
})

test('focusLast', async () => {
  await QuickPick.focusLast()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('QuickPick.focusLast')
})

test('focusIndex', async () => {
  await QuickPick.focusIndex(1)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('QuickPick.focusIndex', 1)
})

test('focusPrevious', async () => {
  await QuickPick.focusPrevious()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('QuickPick.focusPrevious')
})

test('selectItem', async () => {
  await QuickPick.selectItem('test')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('QuickPick.selectItem', 'test')
})

test('selectIndex', async () => {
  await QuickPick.selectIndex(1)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('QuickPick.selectIndex', 1)
})

test('selectCurrentIndex', async () => {
  await QuickPick.selectCurrentIndex()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('QuickPick.selectCurrentIndex')
})

test('executeCommand', async () => {
  await QuickPick.executeCommand('test')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(3)
  expect(mockRpc.invoke).toHaveBeenNthCalledWith(1, 'QuickPick.showCommands')
  expect(mockRpc.invoke).toHaveBeenNthCalledWith(2, 'QuickPick.handleInput', 'test', 0)
  expect(mockRpc.invoke).toHaveBeenNthCalledWith(3, 'QuickPick.selectItem', 'test')
})
