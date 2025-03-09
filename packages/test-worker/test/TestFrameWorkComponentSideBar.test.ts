import { test, expect, beforeEach, jest } from '@jest/globals'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as SideBar from '../src/parts/TestFrameWorkComponentSideBar/TestFrameWorkComponentSideBar.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

beforeEach(() => {
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)
  mockRpc.invoke.mockReset()
})

test('open', async () => {
  await SideBar.open('test-id')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('SideBar.openViewlet', 'test-id')
})

test('hide', async () => {
  await SideBar.hide()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Layout.hideSideBar')
})
