import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as KeyBoard from '../src/parts/TestFrameWorkComponentKeyBoard/TestFrameWorkComponentKeyBoard.ts'

// basic case

test('press: simple key', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.performKeyBoardAction'() {
      return undefined
    },
  })
  await KeyBoard.press('a')
  expect(mockRpc.invocations).toEqual([
    [
      'TestFrameWork.performKeyBoardAction',
      'press',
      {
        altKey: false,
        bubbles: true,
        cancelable: true,
        ctrlKey: false,
        key: 'a',
      },
    ],
  ])
})

// modifier parsing

test('press: with modifiers Control+Alt+Space', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.performKeyBoardAction'() {
      return undefined
    },
  })
  await KeyBoard.press('Control+Alt+Space')
  expect(mockRpc.invocations).toEqual([
    [
      'TestFrameWork.performKeyBoardAction',
      'press',
      {
        altKey: true,
        bubbles: true,
        cancelable: true,
        ctrlKey: true,
        key: ' ',
      },
    ],
  ])
})
