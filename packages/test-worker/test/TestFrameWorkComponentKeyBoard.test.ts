import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as KeyBoard from '../src/parts/TestFrameWorkComponentKeyBoard/TestFrameWorkComponentKeyBoard.ts'

// basic case

test('press: simple key', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      return undefined
    },
  })
  await KeyBoard.press('a')
  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.performKeyBoardAction', 'press', {
      cancelable: true,
      bubbles: true,
      key: 'a',
      ctrlKey: false,
      altKey: false,
    }]
  ])
})

// modifier parsing

test('press: with modifiers Control+Alt+Space', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      return undefined
    },
  })
  await KeyBoard.press('Control+Alt+Space')
  expect(mockRpc.invocations).toEqual([
    ['TestFrameWork.performKeyBoardAction', 'press', {
      cancelable: true,
      bubbles: true,
      key: ' ',
      ctrlKey: true,
      altKey: true,
    }]
  ])
})
