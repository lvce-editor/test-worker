import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Platform from '../src/parts/TestFrameWorkComponentPlatform/TestFrameWorkComponentPlatform.ts'

test('getNodePath delegates to PlatformPaths.getNodePath', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Platform.getNodePath'() {
      return '/usr/bin/node'
    },
  })

  const nodePath = await Platform.getNodePath()
  expect(nodePath).toBe('/usr/bin/node')
  expect(mockRpc.invocations).toEqual([['Platform.getNodePath']])
})
