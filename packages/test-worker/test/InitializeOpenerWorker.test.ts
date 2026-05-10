import { expect, test } from '@jest/globals'
import { OpenerWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { initializeOpenerWorker } from '../src/parts/InitializeOpenerWorker/InitializeOpenerWorker.ts'

test('initializeOpenerWorker: initializes lazy RPC and responds to messages', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToOpenerWorker'(port: MessagePort): undefined {
      port.onmessage = (event: any): void => {
        const { data, target } = event
        target.postMessage({
          id: data.id,
          jsonrpc: '2.0',
          result: 123,
        })
      }
      return undefined
    },
  })
  await initializeOpenerWorker()
  await OpenerWorker.invoke('test.command', {})
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToOpenerWorker', expect.anything(), 'HandleMessagePort.handleMessagePort', 9001],
  ])
  await OpenerWorker.dispose()
})
