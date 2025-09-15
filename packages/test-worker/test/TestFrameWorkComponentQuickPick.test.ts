import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as QuickPick from '../src/parts/TestFrameWorkComponentQuickPick/TestFrameWorkComponentQuickPick.ts'

test('open', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.openWidget'() {
      return undefined
    },
  })

  await QuickPick.open()
  expect(mockRpc.invocations).toEqual([['Viewlet.openWidget', 'QuickPick', 'everything']])
})

test('handleInput', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.handleInput'() {
      return undefined
    },
  })

  await QuickPick.handleInput('test')
  expect(mockRpc.invocations).toEqual([['QuickPick.handleInput', 'test', 0]])
})

test('handleClickAt', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.handleClickAt'() {
      return undefined
    },
  })

  await QuickPick.handleClickAt(100, 200)
  expect(mockRpc.invocations).toEqual([['QuickPick.handleClickAt', 100, 200]])
})

test('setValue', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.setValue'() {
      return undefined
    },
  })

  await QuickPick.setValue('test')
  expect(mockRpc.invocations).toEqual([['QuickPick.setValue', 'test']])
})

test('focusNext', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.focusNext'() {
      return undefined
    },
  })

  await QuickPick.focusNext()
  expect(mockRpc.invocations).toEqual([['QuickPick.focusNext']])
})

test('focusFirst', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.focusFirst'() {
      return undefined
    },
  })

  await QuickPick.focusFirst()
  expect(mockRpc.invocations).toEqual([['QuickPick.focusFirst']])
})

test('focusLast', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.focusLast'() {
      return undefined
    },
  })

  await QuickPick.focusLast()
  expect(mockRpc.invocations).toEqual([['QuickPick.focusLast']])
})

test('focusIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.focusIndex'() {
      return undefined
    },
  })

  await QuickPick.focusIndex(1)
  expect(mockRpc.invocations).toEqual([['QuickPick.focusIndex', 1]])
})

test('focusPrevious', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.focusPrevious'() {
      return undefined
    },
  })

  await QuickPick.focusPrevious()
  expect(mockRpc.invocations).toEqual([['QuickPick.focusPrevious']])
})

test('selectItem', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.selectItem'() {
      return undefined
    },
  })

  await QuickPick.selectItem('test')
  expect(mockRpc.invocations).toEqual([['QuickPick.selectItem', 'test']])
})

test('selectIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.selectIndex'() {
      return undefined
    },
  })

  await QuickPick.selectIndex(1)
  expect(mockRpc.invocations).toEqual([['QuickPick.selectIndex', 1]])
})

test('selectCurrentIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.selectCurrentIndex'() {
      return undefined
    },
  })

  await QuickPick.selectCurrentIndex()
  expect(mockRpc.invocations).toEqual([['QuickPick.selectCurrentIndex']])
})

test('executeCommand', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.showCommands'() {
      return undefined
    },
    'QuickPick.handleInput'() {
      return undefined
    },
    'QuickPick.selectItem'() {
      return undefined
    },
  })

  await QuickPick.executeCommand('test')
  expect(mockRpc.invocations).toEqual([
    ['QuickPick.showCommands'],
    ['QuickPick.handleInput', 'test', 0],
    ['QuickPick.selectItem', 'test']
  ])
})
