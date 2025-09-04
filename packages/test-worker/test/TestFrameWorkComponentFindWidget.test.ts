import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as FindWidget from '../src/parts/TestFrameWorkComponentFindWidget/TestFrameWorkComponentFindWidget.ts'

test('focusNext', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await FindWidget.focusNext()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('FindWidget.focusNext')
})

test('setValue', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await FindWidget.setValue('hello')

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('FindWidget.handleInput', 'hello', 2)
})
