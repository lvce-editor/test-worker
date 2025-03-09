import { test, expect, beforeEach, jest } from '@jest/globals'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as About from '../src/parts/TestFrameWorkComponentAbout/TestFrameWorkComponentAbout.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

beforeEach(() => {
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)
  mockRpc.invoke.mockReset()
})

test('show', async () => {
  await About.show()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('About.showAbout')
})

test('handleClickOk', async () => {
  await About.handleClickOk()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('About.handleClickOk')
})

test('handleClickClose', async () => {
  await About.handleClickClose()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('About.handleClickClose')
})

test('handleClickCopy', async () => {
  await About.handleClickCopy()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('About.handleClickCopy')
})

test('focusNext', async () => {
  await About.focusNext()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('About.focusNext')
})

test('focusPrevious', async () => {
  await About.focusPrevious()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('About.focusPrevious')
})
