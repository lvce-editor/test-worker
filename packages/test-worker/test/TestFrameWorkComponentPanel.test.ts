import { beforeEach, expect, jest, test } from '@jest/globals'
import * as ParentRpc from '../src/parts/RendererWorker/RendererWorker.ts'
import * as Panel from '../src/parts/TestFrameWorkComponentPanel/TestFrameWorkComponentPanel.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

beforeEach(() => {
  ParentRpc.set(mockRpc)
  mockRpc.invoke.mockReset()
})

test('open', async () => {
  await Panel.open('test-panel')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Layout.showPanel', 'test-panel')
})
