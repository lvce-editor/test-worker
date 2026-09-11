import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Workspace from '../src/parts/TestFrameWorkComponentWorkspace/TestFrameWorkComponentWorkspace.ts'

test('setPath forwards to rpc', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.setPath'() {
      return undefined
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- Verify backward compatibility for existing tests.
  await Workspace.setPath('/tmp/workspace')
  expect(mockRpc.invocations).toEqual([['Workspace.setPath', '/tmp/workspace']])
})

test.each(['file:///tmp/workspace%20folder', 'memfs:///workspace'])('setUri forwards %s to rpc', async (uri) => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.setUri'() {
      return undefined
    },
  })
  await Workspace.setUri(uri)
  expect(mockRpc.invocations).toEqual([['Workspace.setUri', uri]])
})

test('openTmpDir sets workspace uri and returns it', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.setUri'() {
      return undefined
    },
  })
  const result = await Workspace.openTmpDir()
  expect(result).toBe('memfs:///workspace')
  expect(mockRpc.invocations).toEqual([['Workspace.setUri', 'memfs:///workspace']])
})

test('close forwards to rpc', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Workspace.close'() {
      return undefined
    },
  })
  await Workspace.close()
  expect(mockRpc.invocations).toEqual([['Workspace.close']])
})
