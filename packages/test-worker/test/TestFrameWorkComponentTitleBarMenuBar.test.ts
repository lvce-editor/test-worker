import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TitleBar from '../src/parts/TestFrameWorkComponentTitleBarMenuBar/TestFrameWorkComponentTitleBarMenuBar.ts'

test('closeMenu', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.closeMenu'() {
      return undefined
    },
  })

  await TitleBar.closeMenu()
  expect(mockRpc.invocations).toEqual([['TitleBar.closeMenu']])
})

test('focus', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.focus'() {
      return undefined
    },
  })

  await TitleBar.focus()
  expect(mockRpc.invocations).toEqual([['TitleBar.focus']])
})

test('focusFirst', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.focusFirst'() {
      return undefined
    },
  })

  await TitleBar.focusFirst()
  expect(mockRpc.invocations).toEqual([['TitleBar.focusFirst']])
})

test('focusIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.focusIndex'() {
      return undefined
    },
  })

  await TitleBar.focusIndex(4)
  expect(mockRpc.invocations).toEqual([['TitleBar.focusIndex', 4]])
})

test('focusLast', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.focusLast'() {
      return undefined
    },
  })

  await TitleBar.focusLast()
  expect(mockRpc.invocations).toEqual([['TitleBar.focusLast']])
})

test('focusNext', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.focusNext'() {
      return undefined
    },
  })

  await TitleBar.focusNext()
  expect(mockRpc.invocations).toEqual([['TitleBar.focusNext']])
})

test('focusPrevious', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.focusPrevious'() {
      return undefined
    },
  })

  await TitleBar.focusPrevious()
  expect(mockRpc.invocations).toEqual([['TitleBar.focusPrevious']])
})

test('handleKeyArrowDown', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.handleKeyArrowDown'() {
      return undefined
    },
  })

  await TitleBar.handleKeyArrowDown()
  expect(mockRpc.invocations).toEqual([['TitleBar.handleKeyArrowDown']])
})

test('handleKeyArrowLeft', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.handleKeyArrowLeft'() {
      return undefined
    },
  })

  await TitleBar.handleKeyArrowLeft()
  expect(mockRpc.invocations).toEqual([['TitleBar.handleKeyArrowLeft']])
})

test('handleKeyArrowRight', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.handleKeyArrowRight'() {
      return undefined
    },
  })

  await TitleBar.handleKeyArrowRight()
  expect(mockRpc.invocations).toEqual([['TitleBar.handleKeyArrowRight']])
})

test('handleKeyArrowUp', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.handleKeyArrowUp'() {
      return undefined
    },
  })

  await TitleBar.handleKeyArrowUp()
  expect(mockRpc.invocations).toEqual([['TitleBar.handleKeyArrowUp']])
})

test('handleKeyEnd', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.handleKeyEnd'() {
      return undefined
    },
  })

  await TitleBar.handleKeyEnd()
  expect(mockRpc.invocations).toEqual([['TitleBar.handleKeyEnd']])
})

test('handleKeyHome', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.handleKeyHome'() {
      return undefined
    },
  })

  await TitleBar.handleKeyHome()
  expect(mockRpc.invocations).toEqual([['TitleBar.handleKeyHome']])
})

test('handleKeySpace', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.handleKeySpace'() {
      return undefined
    },
  })

  await TitleBar.handleKeySpace()
  expect(mockRpc.invocations).toEqual([['TitleBar.handleKeySpace']])
})

test('handleKeyEscape', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.handleKeyEscape'() {
      return undefined
    },
  })

  await TitleBar.handleKeyEscape()
  expect(mockRpc.invocations).toEqual([['TitleBar.handleKeyEscape']])
})

test('toggleIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.toggleIndex'() {
      return undefined
    },
  })

  await TitleBar.toggleIndex(2)
  expect(mockRpc.invocations).toEqual([['TitleBar.toggleIndex', 2]])
})

test('toggleMenu', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.toggleMenu'() {
      return undefined
    },
  })

  await TitleBar.toggleMenu()
  expect(mockRpc.invocations).toEqual([['TitleBar.toggleMenu']])
})

test('handleContextMenu', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBar.handleContextMenu'() {
      return undefined
    },
  })

  await TitleBar.handleContextMenu(1, 150, 50)
  expect(mockRpc.invocations).toEqual([['TitleBar.handleContextMenu', 1, 150, 50]])
})
