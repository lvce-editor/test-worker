import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as KeyBindingsEditor from '../src/parts/TestFrameWorkComponentKeyBindingsEditor/TestFrameWorkComponentKeyBindingsEditor.ts'

test('open', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri'() {
      return undefined
    },
  })

  await KeyBindingsEditor.open()
  expect(mockRpc.invocations).toEqual([['Main.openUri', 'app://keybindings']])
})

test('handleInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.handleInput'() {
      return undefined
    },
  })

  await KeyBindingsEditor.handleInput('test')
  expect(mockRpc.invocations).toEqual([['KeyBindings.handleInput', 'test']])
})

test('handleClick', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.handleClick'() {
      return undefined
    },
  })

  await KeyBindingsEditor.handleClick(10, 20)
  expect(mockRpc.invocations).toEqual([['KeyBindings.handleClick', 10, 20]])
})

test('handleWheel', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.handleWheel'() {
      return undefined
    },
  })

  await KeyBindingsEditor.handleWheel(1, 100)
  expect(mockRpc.invocations).toEqual([['KeyBindings.handleWheel', 1, 100]])
})

test('handleDoubleClick', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.handleDoubleClick'() {
      return undefined
    },
  })

  await KeyBindingsEditor.handleDoubleClick(10, 20)
  expect(mockRpc.invocations).toEqual([['KeyBindings.handleDoubleClick', 10, 20]])
})

test('focusNext', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.focusNext'() {
      return undefined
    },
  })

  await KeyBindingsEditor.focusNext()
  expect(mockRpc.invocations).toEqual([['KeyBindings.focusNext']])
})

test('focusPrevious', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.focusPrevious'() {
      return undefined
    },
  })

  await KeyBindingsEditor.focusPrevious()
  expect(mockRpc.invocations).toEqual([['KeyBindings.focusPrevious']])
})

test('focusFirst', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.focusFirst'() {
      return undefined
    },
  })

  await KeyBindingsEditor.focusFirst()
  expect(mockRpc.invocations).toEqual([['KeyBindings.focusFirst']])
})

test('focusIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.focusIndex'() {
      return undefined
    },
  })

  await KeyBindingsEditor.focusIndex(5)
  expect(mockRpc.invocations).toEqual([['KeyBindings.focusIndex', 5]])
})

test('focusLast', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.focusLast'() {
      return undefined
    },
  })

  await KeyBindingsEditor.focusLast()
  expect(mockRpc.invocations).toEqual([['KeyBindings.focusLast']])
})

test('toggleRecordingKeys', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.toggleRecordingKeys'() {
      return undefined
    },
  })

  await KeyBindingsEditor.toggleRecordingKeys()
  expect(mockRpc.invocations).toEqual([['KeyBindings.toggleRecordingKeys']])
})

test('startRecordingKeys', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.startRecordingKeys'() {
      return undefined
    },
  })

  await KeyBindingsEditor.startRecordingKeys()
  expect(mockRpc.invocations).toEqual([['KeyBindings.startRecordingKeys']])
})

test('clearInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.clearInput'() {
      return undefined
    },
  })

  await KeyBindingsEditor.clearInput()
  expect(mockRpc.invocations).toEqual([['KeyBindings.clearInput']])
})

test('sortByPrecedence', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.sortByPrecedence'() {
      return undefined
    },
  })

  await KeyBindingsEditor.sortByPrecedence()
  expect(mockRpc.invocations).toEqual([['KeyBindings.sortByPrecedence']])
})

test('stopRecordingKeys', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.stopRecordingKeys'() {
      return undefined
    },
  })

  await KeyBindingsEditor.stopRecordingKeys()
  expect(mockRpc.invocations).toEqual([['KeyBindings.stopRecordingKeys']])
})

test('handleContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.handleContextMenu'() {
      return undefined
    },
  })

  await KeyBindingsEditor.handleContextMenu(1, 10, 20)
  expect(mockRpc.invocations).toEqual([['KeyBindings.handleContextMenu', 1, 10, 20]])
})

test('copyCommandId', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.copyCommandId'() {
      return undefined
    },
  })

  await KeyBindingsEditor.copyCommandId()
  expect(mockRpc.invocations).toEqual([['KeyBindings.copyCommandId']])
})

test('copyCommandTitle', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.copyCommandTitle'() {
      return undefined
    },
  })

  await KeyBindingsEditor.copyCommandTitle()
  expect(mockRpc.invocations).toEqual([['KeyBindings.copyCommandTitle']])
})

test('addKeyBinding', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.addKeyBinding'() {
      return undefined
    },
  })

  await KeyBindingsEditor.addKeyBinding()
  expect(mockRpc.invocations).toEqual([['KeyBindings.addKeyBinding']])
})

test('removeKeyBinding', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.removeKeyBinding'() {
      return undefined
    },
  })

  await KeyBindingsEditor.removeKeyBinding()
  expect(mockRpc.invocations).toEqual([['KeyBindings.removeKeyBinding']])
})

test('changeWhenExpression', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.changeWhenExpression'() {
      return undefined
    },
  })

  await KeyBindingsEditor.changeWhenExpression()
  expect(mockRpc.invocations).toEqual([['KeyBindings.changeWhenExpression']])
})

test('showSameKeyBindings', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.showSameKeyBindings'() {
      return undefined
    },
  })

  await KeyBindingsEditor.showSameKeyBindings()
  expect(mockRpc.invocations).toEqual([['KeyBindings.showSameKeyBindings']])
})

test('resetKeyBinding', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'KeyBindings.resetKeyBinding'() {
      return undefined
    },
  })

  await KeyBindingsEditor.resetKeyBinding()
  expect(mockRpc.invocations).toEqual([['KeyBindings.resetKeyBinding']])
})
