import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Workspace from '../src/parts/TestFrameWorkComponentWorkspace/TestFrameWorkComponentWorkspace.ts'

test('setPath forwards to rpc', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.setPath'() {
      return undefined
    },
  })
  await Workspace.setPath('/tmp/workspace')
  expect(mockRpc.invocations).toEqual([['Workspace.setPath', '/tmp/workspace']])
})

test('openTmpDir sets workspace path and returns it', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.setPath'() {
      return undefined
    },
  })
  const result = await Workspace.openTmpDir()
  expect(result).toBe('memfs:///workspace')
  expect(mockRpc.invocations).toEqual([['Workspace.setPath', 'memfs:///workspace']])
})
