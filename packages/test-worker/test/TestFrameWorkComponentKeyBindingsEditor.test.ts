import { beforeEach, expect, jest, test } from '@jest/globals'
import * as ParentRpc from '../src/parts/RendererWorker/RendererWorker.ts'
import * as KeyBindingsEditor from '../src/parts/TestFrameWorkComponentKeyBindingsEditor/TestFrameWorkComponentKeyBindingsEditor.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

beforeEach(() => {
  ParentRpc.set(mockRpc)
  mockRpc.invoke.mockReset()
})

test('open', async () => {
  await KeyBindingsEditor.open()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Main.openUri', 'app://keybindings')
})

test('handleInput', async () => {
  await KeyBindingsEditor.handleInput('test')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.handleInput', 'test')
})

test('handleClick', async () => {
  await KeyBindingsEditor.handleClick(10, 20)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.handleClick', 10, 20)
})

test('handleWheel', async () => {
  await KeyBindingsEditor.handleWheel(1, 100)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.handleWheel', 1, 100)
})

test('handleDoubleClick', async () => {
  await KeyBindingsEditor.handleDoubleClick(10, 20)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.handleDoubleClick', 10, 20)
})

test('focusNext', async () => {
  await KeyBindingsEditor.focusNext()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.focusNext')
})

test('focusPrevious', async () => {
  await KeyBindingsEditor.focusPrevious()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.focusPrevious')
})

test('focusFirst', async () => {
  await KeyBindingsEditor.focusFirst()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.focusFirst')
})

test('focusLast', async () => {
  await KeyBindingsEditor.focusLast()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.focusLast')
})

test('toggleRecordingKeys', async () => {
  await KeyBindingsEditor.toggleRecordingKeys()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.toggleRecordingKeys')
})

test('startRecordingKeys', async () => {
  await KeyBindingsEditor.startRecordingKeys()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.startRecordingKeys')
})

test('clearInput', async () => {
  await KeyBindingsEditor.clearInput()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.clearInput')
})

test('sortByPrecedence', async () => {
  await KeyBindingsEditor.sortByPrecedence()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.sortByPrecedence')
})

test('stopRecordingKeys', async () => {
  await KeyBindingsEditor.stopRecordingKeys()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.stopRecordingKeys')
})

test('handleContextMenu', async () => {
  await KeyBindingsEditor.handleContextMenu(1, 10, 20)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.handleContextMenu', 1, 10, 20)
})

test('copyCommandId', async () => {
  await KeyBindingsEditor.copyCommandId()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.copyCommandId')
})

test('copyCommandTitle', async () => {
  await KeyBindingsEditor.copyCommandTitle()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.copyCommandTitle')
})

test('addKeyBinding', async () => {
  await KeyBindingsEditor.addKeyBinding()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.addKeyBinding')
})

test('removeKeyBinding', async () => {
  await KeyBindingsEditor.removeKeyBinding()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.removeKeyBinding')
})

test('changeWhenExpression', async () => {
  await KeyBindingsEditor.changeWhenExpression()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.changeWhenExpression')
})

test('showSameKeyBindings', async () => {
  await KeyBindingsEditor.showSameKeyBindings()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.showSameKeyBindings')
})

test('resetKeyBinding', async () => {
  await KeyBindingsEditor.resetKeyBinding()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('KeyBindings.resetKeyBinding')
})
