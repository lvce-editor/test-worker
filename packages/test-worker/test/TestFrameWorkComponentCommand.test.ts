import { expect, test } from '@jest/globals'
import * as Command from '../src/parts/TestFrameWorkComponentCommand/TestFrameWorkComponentCommand.ts'
import { createMockRpcWithInvocations } from './test-utils.ts'

test('execute', async () => {
  const mockRpc = createMockRpcWithInvocations(async (method: string, ...args: readonly any[]) => {
    if (method === 'Some.command') {
      return 'ok'
    }
    throw new Error(`unexpected method ${method}`)
  })

  const result: any = await Command.execute('Some.command', 1, 2)

  expect(result).toBe('ok')
  expect(mockRpc.invocations).toEqual([
    ['Some.command', 1, 2]
  ])
})
