import { beforeEach, expect, jest, test } from '@jest/globals'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as Problems from '../src/parts/TestFrameWorkComponentProblems/TestFrameWorkComponentProblems.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

beforeEach(() => {
  ParentRpc.set(mockRpc)
  mockRpc.invoke.mockReset()
})

test('show', async () => {
  await Problems.show()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Panel.selectIndex', 0)
})
