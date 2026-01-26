import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as QuickPick from '../src/parts/TestFrameWorkComponentQuickPick/TestFrameWorkComponentQuickPick.ts'

test('open', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.openWidget'() {
      return undefined
    },
  })

  await QuickPick.open()
  expect(mockRpc.invocations).toEqual([['Viewlet.openWidget', 'QuickPick', 'everything']])
})

test('handleInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.handleInput'() {
      return undefined
    },
  })

  await QuickPick.handleInput('test')
  expect(mockRpc.invocations).toEqual([['QuickPick.handleInput', 'test', 0]])
})

test('handleClickAt', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.handleClickAt'() {
      return undefined
    },
  })

  await QuickPick.handleClickAt(100, 200)
  expect(mockRpc.invocations).toEqual([['QuickPick.handleClickAt', 100, 200]])
})

test('setValue', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.setValue'() {
      return undefined
    },
  })

  await QuickPick.setValue('test')
  expect(mockRpc.invocations).toEqual([['QuickPick.setValue', 'test']])
})

test('focusNext', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.focusNext'() {
      return undefined
    },
  })

  await QuickPick.focusNext()
  expect(mockRpc.invocations).toEqual([['QuickPick.focusNext']])
})

test('focusFirst', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.focusFirst'() {
      return undefined
    },
  })

  await QuickPick.focusFirst()
  expect(mockRpc.invocations).toEqual([['QuickPick.focusFirst']])
})

test('focusLast', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.focusLast'() {
      return undefined
    },
  })

  await QuickPick.focusLast()
  expect(mockRpc.invocations).toEqual([['QuickPick.focusLast']])
})

test('focusIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.focusIndex'() {
      return undefined
    },
  })

  await QuickPick.focusIndex(1)
  expect(mockRpc.invocations).toEqual([['QuickPick.focusIndex', 1]])
})

test('focusPrevious', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.focusPrevious'() {
      return undefined
    },
  })

  await QuickPick.focusPrevious()
  expect(mockRpc.invocations).toEqual([['QuickPick.focusPrevious']])
})

test('selectItem', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.selectItem'() {
      return undefined
    },
  })

  await QuickPick.selectItem('test')
  expect(mockRpc.invocations).toEqual([['QuickPick.selectItem', 'test']])
})

test('selectIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.selectIndex'() {
      return undefined
    },
  })

  await QuickPick.selectIndex(1)
  expect(mockRpc.invocations).toEqual([['QuickPick.selectIndex', 1]])
})

test('selectCurrentIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.selectCurrentIndex'() {
      return undefined
    },
  })

  await QuickPick.selectCurrentIndex()
  expect(mockRpc.invocations).toEqual([['QuickPick.selectCurrentIndex']])
})

test('executeCommand', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.handleInput'() {
      return undefined
    },
    'QuickPick.selectItem'() {
      return undefined
    },
    'QuickPick.showCommands'() {
      return undefined
    },
  })

  await QuickPick.executeCommand('test')
  expect(mockRpc.invocations).toEqual([['QuickPick.showCommands'], ['QuickPick.handleInput', 'test', 0], ['QuickPick.selectItem', 'test']])
})

test('selectItem2', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    async 'Test.registerTestCommand'(commandId: string) {
      return
    },
    async 'QuickPick.selectItem'(label: string) {
      return
    },
  })

  // Create a promise that we can resolve from outside
  const callbackPromise = new Promise<void>((resolve) => {
    setTimeout(resolve, 0)
  })

  const selectPromise = QuickPick.selectItem2({ callbackCommand: 'testCommand', label: 'testLabel' })

  // The test will pass if both RPC calls are made
  await callbackPromise

  expect(mockRpc.invocations).toContainEqual(['Test.registerTestCommand', 'testCommand'])
  expect(mockRpc.invocations).toContainEqual(['QuickPick.selectItem', 'testLabel'])
}, 10000)
