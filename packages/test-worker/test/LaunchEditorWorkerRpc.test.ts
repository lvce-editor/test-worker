import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { launchEditorWorkerRpc } from '../src/parts/LaunchEditorWorkerRpc/LaunchEditorWorkerRpc.ts'

test('launchEditorWorkerRpc creates RPC with correct configuration', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {
      return undefined
    },
  })

  const rpc = await launchEditorWorkerRpc()

  expect(rpc).toBeDefined()
  expect(typeof rpc.invoke).toBe('function')
  expect(mockRpc.invocations).toHaveLength(1)
  expect(mockRpc.invocations[0][0]).toBe('SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker')

  // Close the RPC connection to prevent Jest warnings
  await rpc.dispose()
})

test('launchEditorWorkerRpc returns RPC with empty commandMap', async () => {
  RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {
      return undefined
    },
  })

  const rpc = await launchEditorWorkerRpc()

  expect(rpc).toBeDefined()
  expect(typeof rpc.invoke).toBe('function')

  // Close the RPC connection to prevent Jest warnings
  await rpc.dispose()
})

test('launchEditorWorkerRpc calls sendMessagePortToEditorWorker with correct parameters', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'() {
      return undefined
    },
  })

  const rpc = await launchEditorWorkerRpc()

  expect(mockRpc.invocations).toHaveLength(1)
  expect(mockRpc.invocations[0][0]).toBe('SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker')
  expect(mockRpc.invocations[0][1]).toBeDefined() // MessagePort
  expect(mockRpc.invocations[0][2]).toBe('HandleMessagePort.handleMessagePort') // RpcId.TestWorker

  // Close the RPC connection to prevent Jest warnings
  await rpc.dispose()
})
