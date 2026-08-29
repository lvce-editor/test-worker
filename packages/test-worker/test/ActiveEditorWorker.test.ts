import { afterEach, expect, test } from '@jest/globals'
import { createMockRpc, type Rpc } from '@lvce-editor/rpc'
import { EditorWorker, MainAreaWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as ActiveEditorWorker from '../src/parts/ActiveEditorWorker/ActiveEditorWorker.ts'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'

afterEach(() => {
  RendererProcess.state.rpc = undefined
})

test('invokes a command for the active editor directly', async () => {
  const rendererProcessRpc = createMockRpc({
    commandMap: {
      'DirectView.getFocusedUid'() {
        return 42
      },
    },
  })
  RendererProcess.state.rpc = rendererProcessRpc
  using editorRpc = EditorWorker.registerMockRpc({
    'Editor.executeViewletCommand'() {},
  })

  await ActiveEditorWorker.invoke('Editor.type', 'abc')

  expect(rendererProcessRpc.invocations).toEqual([['DirectView.getFocusedUid', 'Editor']])
  expect(editorRpc.invocations).toEqual([['Editor.executeViewletCommand', 42, 'Editor.type', 'abc']])
})

test('uses the main area editor when no editor owns focus', async () => {
  const rendererProcessRpc = createMockRpc({
    commandMap: {
      'DirectView.getFocusedUid'() {
        throw new Error('focused direct view not found: Editor')
      },
      'DirectView.getUid'() {
        return 7
      },
    },
  })
  RendererProcess.state.rpc = rendererProcessRpc
  const mainAreaRpc = createMockRpc({
    commandMap: {
      'MainArea.getActiveEditorUid'() {
        return 42
      },
    },
  })
  Object.assign(mainAreaRpc, { dispose: async () => {} })
  MainAreaWorker.set(mainAreaRpc)
  using editorRpc = EditorWorker.registerMockRpc({
    'Editor.executeViewletCommand'() {},
  })

  await ActiveEditorWorker.invoke('Editor.type', 'abc')

  expect(rendererProcessRpc.invocations).toEqual([
    ['DirectView.getFocusedUid', 'Editor'],
    ['DirectView.getUid', 'MainArea'],
  ])
  expect(mainAreaRpc.invocations).toEqual([['MainArea.getActiveEditorUid', 7]])
  expect(editorRpc.invocations).toEqual([['Editor.executeViewletCommand', 42, 'Editor.type', 'abc']])
  await MainAreaWorker.dispose()
})

test('invokes the main area editor even when another editor owns focus', async () => {
  const rendererProcessRpc = createMockRpc({
    commandMap: {
      'DirectView.getFocusedUid'() {
        return 99
      },
      'DirectView.getUid'() {
        return 7
      },
    },
  })
  RendererProcess.state.rpc = rendererProcessRpc
  const mainAreaRpc = createMockRpc({
    commandMap: {
      'MainArea.getActiveEditorUid'() {
        return 42
      },
    },
  })
  Object.assign(mainAreaRpc, { dispose: async () => {} })
  MainAreaWorker.set(mainAreaRpc)
  using editorRpc = EditorWorker.registerMockRpc({
    'Editor.executeViewletCommand'() {
      return 'main area text'
    },
  })

  try {
    const text = await ActiveEditorWorker.invokeMainArea('Editor.getText')
    expect(text).toBe('main area text')
    expect(rendererProcessRpc.invocations).toEqual([['DirectView.getUid', 'MainArea']])
    expect(mainAreaRpc.invocations).toEqual([['MainArea.getActiveEditorUid', 7]])
    expect(editorRpc.invocations).toEqual([['Editor.executeViewletCommand', 42, 'Editor.getText']])
  } finally {
    await MainAreaWorker.dispose()
  }
})

test('uses renderer worker before direct connections are initialized', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.type'() {},
  })

  await ActiveEditorWorker.invoke('Editor.type', 'abc')

  expect(mockRpc.invocations).toEqual([['Editor.type', 'abc']])
})

test('uses renderer worker when active editor lookup is unavailable', async () => {
  RendererProcess.state.rpc = createMockRpc({
    commandMap: {
      'DirectView.getUid'() {
        throw new Error('Command not found DirectView.getUid')
      },
    },
  })
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.type'() {},
  })

  await ActiveEditorWorker.invoke('Editor.type', 'abc')

  expect(mockRpc.invocations).toEqual([['Editor.type', 'abc']])
})

test('keeps renderer-worker-only editor commands on renderer worker', async () => {
  RendererProcess.state.rpc = {} as Rpc
  using mockRpc = RendererWorker.registerMockRpc({
    'Editor.rename'() {},
  })

  await ActiveEditorWorker.invoke('Editor.rename')

  expect(mockRpc.invocations).toEqual([['Editor.rename']])
})
