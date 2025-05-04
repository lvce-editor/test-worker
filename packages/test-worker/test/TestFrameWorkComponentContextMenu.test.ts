import { beforeEach, expect, jest, test } from '@jest/globals'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as ContextMenu from '../src/parts/TestFrameWorkComponentContextMenu/TestFrameWorkComponentContextMenu.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

beforeEach(() => {
  ParentRpc.set(mockRpc)
  mockRpc.invoke.mockReset()
})

test('selectItem', async () => {
  await ContextMenu.selectItem('test item')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Menu.selectItem', 'test item')
})
