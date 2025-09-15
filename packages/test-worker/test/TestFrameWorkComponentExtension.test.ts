import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Extension from '../src/parts/TestFrameWorkComponentExtension/TestFrameWorkComponentExtension.ts'

test('addWebExtension', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      return undefined
    },
  })

  await Extension.addWebExtension('extensions/web')

  expect(mockRpc.invocations).toEqual([
    ['ExtensionMeta.addWebExtension', 'extensions/web']
  ])
})

test('addNodeExtension', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      return undefined
    },
  })

  await Extension.addNodeExtension('extensions/node')

  expect(mockRpc.invocations).toEqual([
    ['ExtensionMeta.addNodeExtension', 'extensions/node']
  ])
})
