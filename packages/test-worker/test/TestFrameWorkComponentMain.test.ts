import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Main from '../src/parts/TestFrameWorkComponentMain/TestFrameWorkComponentMain.ts'

test('openUri', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri'() {
      return undefined
    },
  })

  await Main.openUri('file:///test.txt')

  expect(mockRpc.invocations).toEqual([['Main.openUri', 'file:///test.txt']])
})

test('splitRight', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.splitRight'() {
      return undefined
    },
  })

  await Main.splitRight()

  expect(mockRpc.invocations).toEqual([['Main.splitRight']])
})

test('openKeyBindings', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openKeyBindings'() {
      return undefined
    },
  })

  await Main.openKeyBindings()

  expect(mockRpc.invocations).toEqual([['Main.openKeyBindings']])
})

test('closeAllEditors', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.closeAllEditors'() {
      return undefined
    },
  })

  await Main.closeAllEditors()

  expect(mockRpc.invocations).toEqual([['Main.closeAllEditors']])
})

test('closeTabsLeft/Right and others', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.closeActiveEditor'() {
      return undefined
    },
    'Main.closeOthers'() {
      return undefined
    },
    'Main.closeTabsLeft'() {
      return undefined
    },
    'Main.closeTabsRight'() {
      return undefined
    },
    'Main.focusFirst'() {
      return undefined
    },
    'Main.focusLast'() {
      return undefined
    },
    'Main.focusNext'() {
      return undefined
    },
    'Main.focusPrevious'() {
      return undefined
    },
  })

  await Main.closeTabsLeft()
  await Main.closeTabsRight()
  await Main.closeOthers()
  await Main.closeActiveEditor()
  await Main.focusFirst()
  await Main.focusNext()
  await Main.focusPrevious()
  await Main.focusLast()

  expect(mockRpc.invocations).toEqual([
    ['Main.closeTabsLeft'],
    ['Main.closeTabsRight'],
    ['Main.closeOthers'],
    ['Main.closeActiveEditor'],
    ['Main.focusFirst'],
    ['Main.focusNext'],
    ['Main.focusPrevious'],
    ['Main.focusLast'],
  ])
})
