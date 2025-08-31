import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Workspace from '../src/parts/TestFrameWorkComponentWorkspace/TestFrameWorkComponentWorkspace.ts'

const setup = () => {
  const invoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke })
  RendererWorker.set(mockRpc)
  return invoke
}

test('setPath forwards to rpc', async () => {
  const invoke = setup()
  await Workspace.setPath('/tmp/workspace')
  expect(invoke).toHaveBeenCalledWith('Workspace.setPath', '/tmp/workspace')
})

test('openTmpDir sets workspace path and returns it', async () => {
  const invoke = jest.fn(async (method: string) => {
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
  })
  const mockRpc = MockRpc.create({ commandMap: {}, invoke })
  RendererWorker.set(mockRpc)
  const result = await Workspace.openTmpDir()
  expect(result).toBe('memfs:///workspace')
  expect(invoke).toHaveBeenCalledWith('Workspace.setPath', 'memfs:///workspace')
})
