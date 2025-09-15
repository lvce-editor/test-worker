import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TitleBarMenuBar from '../src/parts/TestFrameWorkComponentTitleBarMenuBar/TestFrameWorkComponentTitleBarMenuBar.ts'



test('closeMenu', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.closeMenu'() {
      return undefined
    },
  })

  await TitleBarMenuBar.closeMenu()
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.closeMenu']])
})

test('focus', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.focus'() {
      return undefined
    },
  })

  await TitleBarMenuBar.focus()
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.focus']])
})

test('focusFirst', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.focusFirst'() {
      return undefined
    },
  })

  await TitleBarMenuBar.focusFirst()
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.focusFirst']])
})

test('focusIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.focusIndex'() {
      return undefined
    },
  })

  await TitleBarMenuBar.focusIndex(4)
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.focusIndex', 4]])
})

test('focusLast', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.focusLast'() {
      return undefined
    },
  })

  await TitleBarMenuBar.focusLast()
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.focusLast']])
})

test('focusNext', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.focusNext'() {
      return undefined
    },
  })

  await TitleBarMenuBar.focusNext()
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.focusNext']])
})

test('focusPrevious', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.focusPrevious'() {
      return undefined
    },
  })

  await TitleBarMenuBar.focusPrevious()
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.focusPrevious']])
})

test('handleKeyArrowDown', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.handleKeyArrowDown'() {
      return undefined
    },
  })

  await TitleBarMenuBar.handleKeyArrowDown()
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.handleKeyArrowDown']])
})

test('handleKeyArrowLeft', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.handleKeyArrowLeft'() {
      return undefined
    },
  })

  await TitleBarMenuBar.handleKeyArrowLeft()
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.handleKeyArrowLeft']])
})

test('handleKeyArrowRight', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.handleKeyArrowRight'() {
      return undefined
    },
  })

  await TitleBarMenuBar.handleKeyArrowRight()
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.handleKeyArrowRight']])
})

test('handleKeyArrowUp', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.handleKeyArrowUp'() {
      return undefined
    },
  })

  await TitleBarMenuBar.handleKeyArrowUp()
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.handleKeyArrowUp']])
})

test('handleKeyEnd', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.handleKeyEnd'() {
      return undefined
    },
  })

  await TitleBarMenuBar.handleKeyEnd()
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.handleKeyEnd']])
})

test('handleKeyHome', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.handleKeyHome'() {
      return undefined
    },
  })

  await TitleBarMenuBar.handleKeyHome()
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.handleKeyHome']])
})

test('handleKeySpace', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.handleKeySpace'() {
      return undefined
    },
  })

  await TitleBarMenuBar.handleKeySpace()
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.handleKeySpace']])
})

test('handleKeyEscape', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.handleKeyEscape'() {
      return undefined
    },
  })

  await TitleBarMenuBar.handleKeyEscape()
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.handleKeyEscape']])
})

test('toggleIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.toggleIndex'() {
      return undefined
    },
  })

  await TitleBarMenuBar.toggleIndex(2)
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.toggleIndex', 2]])
})

test('toggleMenu', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'TitleBarMenuBar.toggleMenu'() {
      return undefined
    },
  })

  await TitleBarMenuBar.toggleMenu()
  expect(mockRpc.invocations).toEqual([['TitleBarMenuBar.toggleMenu']])
})
