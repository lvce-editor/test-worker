import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Workspace from '../src/parts/TestFrameWorkComponentWorkspace/TestFrameWorkComponentWorkspace.ts'

const setup = () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      return undefined
    },
  })
  return mockRpc
}

test('setPath forwards to rpc', async () => {
  const mockRpc = setup()
  await Workspace.setPath('/tmp/workspace')
  expect(mockRpc.invocations).toEqual([
    ['Workspace.setPath', '/tmp/workspace']
  ])
})

test('openTmpDir sets workspace path and returns it', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]): Promise<any> => {
      if (method === 'FileSystem.readFile' || method === 'FileSystem.writeFile' || method === 'FileSystem.mkdir' || method === 'FileSystem.remove') {
        return undefined
      }
      if (method === 'PlatformPaths.getTmpDir') {
        return '/tmp'
      }
      if (method === 'Workspace.setPath') {
        return undefined
      }
      throw new Error('unexpected method')
    },
  })
  const result = await Workspace.openTmpDir()
  expect(result).toBe('memfs:///workspace')
  expect(mockRpc.invocations).toEqual([
    ['PlatformPaths.getTmpDir'],
    ['FileSystem.mkdir', '/tmp/workspace'],
    ['Workspace.setPath', 'memfs:///workspace']
  ])
})
