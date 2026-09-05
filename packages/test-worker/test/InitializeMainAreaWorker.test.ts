import { expect, test } from '@jest/globals'
import { MainAreaWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { initializeMainAreaWorker } from '../src/parts/InitializeMainAreaWorker/InitializeMainAreaWorker.ts'

test('initializeMainAreaWorker initializes a lazy RPC', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMainAreaWorker'(port: MessagePort): undefined {
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

  await initializeMainAreaWorker()
  await MainAreaWorker.invoke('test.command')

  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToMainAreaWorker', expect.anything(), 'MainArea.handleTestWorkerMessagePort', 9001],
  ])
  await MainAreaWorker.dispose()
})
