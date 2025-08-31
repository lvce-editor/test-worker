import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Extension from '../src/parts/TestFrameWorkComponentExtension/TestFrameWorkComponentExtension.ts'

test('addWebExtension', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await Extension.addWebExtension('extensions/web')

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('ExtensionMeta.addWebExtension', 'extensions/web')
})

test('addNodeExtension', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await Extension.addNodeExtension('extensions/node')

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('ExtensionMeta.addNodeExtension', 'extensions/node')
})


