import { test, jest, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.js'
import * as Output from '../src/parts/TestFrameWorkComponentOutput/TestFrameWorkComponentOutput.ts'

test('show', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Output.show()

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Panel.selectIndex', 1)
})

test('handleFilterInput', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Output.handleFilterInput('test filter')

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Output.handleFilterInput', 'test filter', 2)
})

test('selectChannel', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  await Output.selectChannel('test-channel-id')

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Output.selectChannel', 'test-channel-id')
})
