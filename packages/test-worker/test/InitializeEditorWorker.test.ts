import { expect, test } from '@jest/globals'
import { RendererWorker, EditorWorker } from '@lvce-editor/rpc-registry'
import { initializeEditorWorker } from '../src/parts/InitializeEditorWorker/InitializeEditorWorker.ts'

test('initializeEditorWorker: initializes lazy RPC and responds to messages', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'(port: MessagePort): undefined {
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
  await initializeEditorWorker()
  await EditorWorker.invoke('test.command', {})
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker', expect.anything(), 'HandleMessagePort.handleMessagePort', 9001],
  ])
  await EditorWorker.dispose()
})
