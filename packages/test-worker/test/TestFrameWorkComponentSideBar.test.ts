import { beforeEach, expect, jest, test } from '@jest/globals'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as SideBar from '../src/parts/TestFrameWorkComponentSideBar/TestFrameWorkComponentSideBar.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

beforeEach(() => {
  ParentRpc.set(mockRpc)
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
