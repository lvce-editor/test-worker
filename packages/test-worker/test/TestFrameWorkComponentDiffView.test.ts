import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createLocator } from '../src/parts/CreateLocator/CreateLocator.ts'
import * as DiffView from '../src/parts/TestFrameWorkComponentDiffView/TestFrameWorkComponentDiffView.ts'

test('open', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri'() {
      return undefined
    },
  })

  await DiffView.open('file:///left.txt', 'file:///right.txt')

  expect(mockRpc.invocations).toEqual([['Main.openUri', 'diff://file:///left.txt<->file:///right.txt']])
})

test('shouldHaveContentLeft', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  await DiffView.shouldHaveContentLeft('left content')

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', createLocator('.DiffEditorContentLeft'), 'toHaveText', { text: 'left content' }],
  ])
})

test('shouldHaveContentRight', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.checkSingleElementCondition'() {
      return {}
    },
  })

  await DiffView.shouldHaveContentRight('right content')

  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.checkSingleElementCondition', createLocator('.DiffEditorContentRight'), 'toHaveText', { text: 'right content' }],
  ])
})

test('setDiffMode', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.setDiffMode'() {
      return undefined
    },
  })

  await DiffView.setDiffMode('inline')

  expect(mockRpc.invocations).toEqual([['DiffView.setDiffMode', 'inline']])
})

test('toggleDiffMode', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.toggleDiffMode'() {
      return undefined
    },
  })

  await DiffView.toggleDiffMode()

  expect(mockRpc.invocations).toEqual([['DiffView.toggleDiffMode']])
})

test('setLayout', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.setLayout'() {
      return undefined
    },
  })

  await DiffView.setLayout('vertical')

  expect(mockRpc.invocations).toEqual([['DiffView.setLayout', 'vertical']])
})

test('setFontFamily', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.setFontFamily'() {
      return undefined
    },
  })

  await DiffView.setFontFamily('monospace')

  expect(mockRpc.invocations).toEqual([['DiffView.setFontFamily', 'monospace']])
})

test('setWordWrap', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.setWordWrap'() {
      return undefined
    },
  })

  await DiffView.setWordWrap(true)

  expect(mockRpc.invocations).toEqual([['DiffView.setWordWrap', true]])
})

test('toggleWhitespace', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.toggleWhitespace'() {
      return undefined
    },
  })

  await DiffView.toggleWhitespace()

  expect(mockRpc.invocations).toEqual([['DiffView.toggleWhitespace']])
})

test('handleWheel', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.handleWheel'() {
      return undefined
    },
  })

  await DiffView.handleWheel(0, 100_000)

  expect(mockRpc.invocations).toEqual([['DiffView.handleWheel', 0, 100_000]])
})

test('handleResize', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.handleResize'() {
      return undefined
    },
  })

  await DiffView.handleResize(420, 180)

  expect(mockRpc.invocations).toEqual([['DiffView.handleResize', 420, 180]])
})

test('handleWorkspaceChange', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.handleWorkspaceChange'() {
      return undefined
    },
  })

  await DiffView.handleWorkspaceChange()

  expect(mockRpc.invocations).toEqual([['DiffView.handleWorkspaceChange']])
})

test('handleClickAt', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.handleClickAt'() {
      return undefined
    },
  })

  await DiffView.handleClickAt(5, 6, 'target')

  expect(mockRpc.invocations).toEqual([['DiffView.handleClickAt', 5, 6, 'target']])
})

test('handleSashPointerDown', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.handleSashPointerDown'() {
      return undefined
    },
  })

  await DiffView.handleSashPointerDown(170, 0)

  expect(mockRpc.invocations).toEqual([['DiffView.handleSashPointerDown', 170, 0]])
})

test('handleSashPointerMove', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.handleSashPointerMove'() {
      return undefined
    },
  })

  await DiffView.handleSashPointerMove(230, 0)

  expect(mockRpc.invocations).toEqual([['DiffView.handleSashPointerMove', 230, 0]])
})

test('handleSashPointerUp', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.handleSashPointerUp'() {
      return undefined
    },
  })

  await DiffView.handleSashPointerUp(230, 0)

  expect(mockRpc.invocations).toEqual([['DiffView.handleSashPointerUp', 230, 0]])
})

test('handleScrollBarPointerDown', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.handleScrollBarPointerDown'() {
      return undefined
    },
  })

  await DiffView.handleScrollBarPointerDown(20)

  expect(mockRpc.invocations).toEqual([['DiffView.handleScrollBarPointerDown', 20]])
})

test('handleScrollBarPointerMove', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.handleScrollBarPointerMove'() {
      return undefined
    },
  })

  await DiffView.handleScrollBarPointerMove(400)

  expect(mockRpc.invocations).toEqual([['DiffView.handleScrollBarPointerMove', 400]])
})

test('handleScrollBarPointerUp', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.handleScrollBarPointerUp'() {
      return undefined
    },
  })

  await DiffView.handleScrollBarPointerUp(400)

  expect(mockRpc.invocations).toEqual([['DiffView.handleScrollBarPointerUp', 400]])
})

test('setCursorPosition', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.setCursorPosition'() {
      return undefined
    },
  })

  await DiffView.setCursorPosition(12, 4)

  expect(mockRpc.invocations).toEqual([['DiffView.setCursorPosition', 12, 4]])
})

test('handleInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'DiffView.handleInput'() {
      return undefined
    },
  })

  await DiffView.handleInput('hello')

  expect(mockRpc.invocations).toEqual([['DiffView.handleInput', 'hello']])
})
