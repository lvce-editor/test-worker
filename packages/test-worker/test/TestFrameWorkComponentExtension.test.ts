import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Extension from '../src/parts/TestFrameWorkComponentExtension/TestFrameWorkComponentExtension.ts'

test('addWebExtension', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionMeta.addWebExtension'() {
      return undefined
    },
  })

  await Extension.addWebExtension('extensions/web')

  expect(mockRpc.invocations).toEqual([['ExtensionMeta.addWebExtension', 'extensions/web']])
})

test('addNodeExtension', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionMeta.addNodeExtension'() {
      return undefined
    },
  })

  await Extension.addNodeExtension('extensions/node')

  expect(mockRpc.invocations).toEqual([['ExtensionMeta.addNodeExtension', 'extensions/node']])
})
