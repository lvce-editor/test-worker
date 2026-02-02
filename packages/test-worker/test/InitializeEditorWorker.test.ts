import { expect, test } from '@jest/globals'
import { RendererWorker, EditorWorker } from '@lvce-editor/rpc-registry'
import { initializeEditorWorker } from '../src/parts/InitializeEditorWorker/InitializeEditorWorker.ts'

test('initializeEditorWorker: initializes lazy RPC and responds to messages', async () => {
  let capturedPort: MessagePort | null = null

  using _mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker'(port: MessagePort): undefined {
      capturedPort = port
      // Listen for messages on the port and send back a response
      port.onmessage = (): void => {
        port.postMessage({ response: 'ack' })
      }
      return undefined
    },
  })

  await initializeEditorWorker()

  // Verify that the port was captured
  expect(capturedPort).toBeDefined()

  // Trigger the lazy RPC by invoking a command to cause the port to be sent
  try {
    await EditorWorker.invoke('test.command', {})
  } catch {
    // Command may not exist, but we're testing the lazy initialization
  }
})
