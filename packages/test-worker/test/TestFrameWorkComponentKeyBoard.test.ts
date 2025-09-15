import { expect, test } from '@jest/globals'
import * as KeyBoard from '../src/parts/TestFrameWorkComponentKeyBoard/TestFrameWorkComponentKeyBoard.ts'
import { createMockRpcWithInvocations } from './test-utils.ts'

// basic case

test('press: simple key', async () => {
  const mockRpc = createMockRpcWithInvocations(async (method: string, ...args: readonly any[]) => {
    return undefined
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
  const mockRpc = createMockRpcWithInvocations(async (method: string, ...args: readonly any[]) => {
    return undefined
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
