import { beforeEach, expect, jest, test } from '@jest/globals'
import * as ParentRpc from '../src/parts/RendererWorker/RendererWorker.ts'
import * as ActivityBar from '../src/parts/TestFrameWorkComponentActivityBar/TestFrameworkComponentActivityBar.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

beforeEach(() => {
  ParentRpc.set(mockRpc)
  mockRpc.invoke.mockReset()
})

test('focus', async () => {
  await ActivityBar.focus()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('ActivityBar.focus')
})

test('focusFirst', async () => {
  await ActivityBar.focusFirst()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('ActivityBar.focusFirst')
})

test('focusLast', async () => {
  await ActivityBar.focusLast()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('ActivityBar.focusLast')
})

test('focusNext', async () => {
  await ActivityBar.focusNext()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('ActivityBar.focusNext')
})

test('focusPrevious', async () => {
  await ActivityBar.focusPrevious()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('ActivityBar.focusPrevious')
})

test('handleClick', async () => {
  await ActivityBar.handleClick(1)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('ActivityBar.handleClick', 1)
})

test('handleContextMenu', async () => {
  await ActivityBar.handleContextMenu()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('ActivityBar.handleContextMenu')
})

test('selectCurrent', async () => {
  await ActivityBar.selectCurrent()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('ActivityBar.selectCurrent')
})
