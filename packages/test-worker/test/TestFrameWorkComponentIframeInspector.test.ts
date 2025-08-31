import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as IframeInspector from '../src/parts/TestFrameWorkComponentIframeInspector/TestFrameWorkComponentIframeInspector.ts'

const setup = (): jest.Mock => {
  const invoke: jest.Mock = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke })
  RendererWorker.set(mockRpc)
  return invoke
}

test('selectIndex', async () => {
  const invoke = setup()
  await IframeInspector.selectIndex(2)
  expect(invoke).toHaveBeenCalledWith('IframeInspector.selectIndex', 2)
})

test('focus navigation methods', async () => {
  const invoke = setup()
  await IframeInspector.focusNext()
  await IframeInspector.focusPrevious()
  await IframeInspector.focusFirst()
  await IframeInspector.focusLast()
  expect(invoke).toHaveBeenCalledWith('IframeInspector.focusNext')
  expect(invoke).toHaveBeenCalledWith('IframeInspector.focusPrevious')
  expect(invoke).toHaveBeenCalledWith('IframeInspector.focusFirst')
  expect(invoke).toHaveBeenCalledWith('IframeInspector.focusLast')
})
