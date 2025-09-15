import { expect, test } from '@jest/globals'
import * as StatusBar from '../src/parts/TestFrameWorkComponentStatusBar/TestFrameWorkComponentStatusBar.ts'
import { createMockRpcWithInvocations } from './test-utils.ts'

test('update calls StatusBar.updateStatusBarItems', async () => {
  const mockRpc = createMockRpcWithInvocations(async (method: string, ...args: readonly any[]) => {
    return undefined
  })
  await StatusBar.update()
  expect(mockRpc.invocations).toEqual([
    ['StatusBar.updateStatusBarItems']
  ])
})
