import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Main from '../src/parts/TestFrameWorkComponentMain/TestFrameWorkComponentMain.ts'

test('openUri', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await Main.openUri('file:///test.txt')

  expect(mockInvoke).toHaveBeenCalledWith('Main.openUri', 'file:///test.txt')
})

test('splitRight', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await Main.splitRight()

  expect(mockInvoke).toHaveBeenCalledWith('Main.splitRight')
})

test('openKeyBindings', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await Main.openKeyBindings()

  expect(mockInvoke).toHaveBeenCalledWith('Main.openKeyBindings')
})

test('closeAllEditors', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await Main.closeAllEditors()

  expect(mockInvoke).toHaveBeenCalledWith('Main.closeAllEditors')
})

test('closeTabsLeft/Right and others', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await Main.closeTabsLeft()
  await Main.closeTabsRight()
  await Main.closeOthers()
  await Main.closeActiveEditor()
  await Main.focusFirst()
  await Main.focusNext()
  await Main.focusPrevious()
  await Main.focusLast()

  expect(mockInvoke).toHaveBeenCalledWith('Main.closeTabsLeft')
  expect(mockInvoke).toHaveBeenCalledWith('Main.closeTabsRight')
  expect(mockInvoke).toHaveBeenCalledWith('Main.closeOthers')
  expect(mockInvoke).toHaveBeenCalledWith('Main.closeActiveEditor')
  expect(mockInvoke).toHaveBeenCalledWith('Main.focusFirst')
  expect(mockInvoke).toHaveBeenCalledWith('Main.focusNext')
  expect(mockInvoke).toHaveBeenCalledWith('Main.focusPrevious')
  expect(mockInvoke).toHaveBeenCalledWith('Main.focusLast')
})


