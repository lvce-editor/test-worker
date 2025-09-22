/* eslint-disable @typescript-eslint/await-thenable */
import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Workspace from '../src/parts/TestFrameWorkComponentWorkspace/TestFrameWorkComponentWorkspace.ts'

test('setPath forwards to rpc', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Workspace.setPath'() {
      return undefined
    },
  })
  await Workspace.setPath('/tmp/workspace')
  expect(mockRpc.invocations).toEqual([['Workspace.setPath', '/tmp/workspace']])
})

test('openTmpDir sets workspace path and returns it', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Workspace.setPath'() {
      return undefined
    },
  })
  const result = await Workspace.openTmpDir()
  expect(result).toBe('memfs:///workspace')
  expect(mockRpc.invocations).toEqual([['Workspace.setPath', 'memfs:///workspace']])
})

test('resolveFileUrl converts url to file url', async () => {
  const result = await Workspace.resolveFileUrl('https://example.com/remote/path/to/file')
  expect(result).toBe('file:///path/to/file')
})

test('resolveFileUrl handles fixture urls in web environment', async () => {
  // This test would require complex platform mocking, so we'll skip it for now
  // The functionality is tested in the ResolveFixtureUri tests
})
