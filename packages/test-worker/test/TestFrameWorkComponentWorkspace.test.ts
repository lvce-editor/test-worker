import { expect, test } from '@jest/globals'
import * as Workspace from '../src/parts/TestFrameWorkComponentWorkspace/TestFrameWorkComponentWorkspace.ts'
import { createMockRpcWithInvocations } from './test-utils.ts'

const setup = () => {
  return createMockRpcWithInvocations(async (method: string, ...args: readonly any[]) => {
    return undefined
  })
}

test('setPath forwards to rpc', async () => {
  const mockRpc = setup()
  await Workspace.setPath('/tmp/workspace')
  expect(mockRpc.invocations).toEqual([
    ['Workspace.setPath', '/tmp/workspace']
  ])
})

test('openTmpDir sets workspace path and returns it', async () => {
  const mockRpc = createMockRpcWithInvocations(async (method: string, ...args: readonly any[]): Promise<any> => {
    if (method === 'Workspace.setPath') {
      return undefined
    }
    throw new Error('unexpected method')
  })
  const result = await Workspace.openTmpDir()
  expect(result).toBe('memfs:///workspace')
  expect(mockRpc.invocations).toEqual([
    ['Workspace.setPath', 'memfs:///workspace']
  ])
})
