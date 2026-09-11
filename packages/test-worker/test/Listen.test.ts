import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { listen } from '../src/parts/Listen/Listen.ts'

test('listen initializes the renderer worker using the supplied port', async () => {
  const { port1, port2 } = new MessageChannel()
  await expect(listen(port1)).resolves.toBeUndefined()
  port2.onmessage = (event): void => {
    port2.postMessage({ jsonrpc: '2.0', id: event.data.id, result: 'ready' })
  }
  await expect(RendererWorker.invoke('test')).resolves.toBe('ready')
  port1.close()
  port2.close()
})
