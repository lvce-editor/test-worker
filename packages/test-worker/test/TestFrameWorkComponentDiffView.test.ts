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
