import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as KeyBoard from '../src/parts/TestFrameWorkComponentKeyBoard/TestFrameWorkComponentKeyBoard.ts'

// basic case

test('press: simple key', async () => {
  const invoke: jest.Mock = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke })
  RendererWorker.set(mockRpc)
  await KeyBoard.press('a')
  expect(invoke).toHaveBeenCalledTimes(1)
  expect(invoke).toHaveBeenCalledWith('TestFrameWork.performKeyBoardAction', 'press', {
    cancelable: true,
    bubbles: true,
    key: 'a',
    ctrlKey: false,
    altKey: false,
  })
})

// modifier parsing

test('press: with modifiers Control+Alt+Space', async () => {
  const invoke: jest.Mock = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke })
  RendererWorker.set(mockRpc)
  await KeyBoard.press('Control+Alt+Space')
  expect(invoke).toHaveBeenCalledTimes(1)
  expect(invoke).toHaveBeenCalledWith('TestFrameWork.performKeyBoardAction', 'press', {
    cancelable: true,
    bubbles: true,
    key: ' ',
    ctrlKey: true,
    altKey: true,
  })
})

