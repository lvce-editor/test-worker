import { beforeEach, expect, jest, test } from '@jest/globals'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import * as TitleBarMenuBar from '../src/parts/TestFrameWorkComponentTitleBarMenuBar/TestFrameWorkComponentTitleBarMenuBar.ts'

const mockInvoke = jest.fn()

const mockRpc = {
  invoke: mockInvoke,
} as any

beforeEach(() => {
  ParentRpc.set(mockRpc)
  mockInvoke.mockReset()
})

test('closeMenu', async () => {
  await TitleBarMenuBar.closeMenu()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.closeMenu')
})

test('focus', async () => {
  await TitleBarMenuBar.focus()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.focus')
})

test('focusFirst', async () => {
  await TitleBarMenuBar.focusFirst()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.focusFirst')
})

test('focusIndex', async () => {
  await TitleBarMenuBar.focusIndex(4)
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.focusIndex', 4)
})

test('focusLast', async () => {
  await TitleBarMenuBar.focusLast()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.focusLast')
})

test('focusNext', async () => {
  await TitleBarMenuBar.focusNext()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.focusNext')
})

test('focusPrevious', async () => {
  await TitleBarMenuBar.focusPrevious()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.focusPrevious')
})

test('handleKeyArrowDown', async () => {
  await TitleBarMenuBar.handleKeyArrowDown()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.handleKeyArrowDown')
})

test('handleKeyArrowLeft', async () => {
  await TitleBarMenuBar.handleKeyArrowLeft()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.handleKeyArrowLeft')
})

test('handleKeyArrowRight', async () => {
  await TitleBarMenuBar.handleKeyArrowRight()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.handleKeyArrowRight')
})

test('handleKeyArrowUp', async () => {
  await TitleBarMenuBar.handleKeyArrowUp()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.handleKeyArrowUp')
})

test('handleKeyEnd', async () => {
  await TitleBarMenuBar.handleKeyEnd()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.handleKeyEnd')
})

test('handleKeyHome', async () => {
  await TitleBarMenuBar.handleKeyHome()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.handleKeyHome')
})

test('handleKeySpace', async () => {
  await TitleBarMenuBar.handleKeySpace()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.handleKeySpace')
})

test('handleKeyEscape', async () => {
  await TitleBarMenuBar.handleKeyEscape()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.handleKeyEscape')
})

test('toggleIndex', async () => {
  await TitleBarMenuBar.toggleIndex(2)
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.toggleIndex', 2)
})

test('toggleMenu', async () => {
  await TitleBarMenuBar.toggleMenu()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('TitleBarMenuBar.toggleMenu')
})
