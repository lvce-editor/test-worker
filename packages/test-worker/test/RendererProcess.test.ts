import type { Rpc } from '@lvce-editor/rpc'
import { afterEach, expect, jest, test } from '@jest/globals'
import { RendererWorker, RpcId } from '@lvce-editor/rpc-registry'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'

const directInvoke = jest.fn<(...params: readonly any[]) => Promise<any>>()
const directRpc = {
  dispose: async (): Promise<void> => {},
  invoke: directInvoke,
} as unknown as Rpc

afterEach(async () => {
  await RendererProcess.state.rpc?.dispose()
  RendererProcess.state.rpc = undefined
  directInvoke.mockReset()
})

test('initialize creates a lazy direct rpc and sends its message port to the renderer process', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToRendererProcess'(port: MessagePort): undefined {
      port.onmessage = (event: MessageEvent): void => {
        const { data } = event
        port.postMessage({
          id: data.id,
          jsonrpc: '2.0',
          result: 123,
        })
      }
      return undefined
    },
  })

  await RendererProcess.initialize()

  await expect(RendererProcess.invoke('TestFrameWork.checkSingleElementCondition', { selector: '.Editor' })).resolves.toBe(123)
  expect(mockRpc.invocations).toEqual([
    [
      'SendMessagePortToExtensionHostWorker.sendMessagePortToRendererProcess',
      expect.anything(),
      'HandleMessagePort.handleMessagePort',
      RpcId.DebugWorker,
    ],
  ])
})

test('invoke uses the direct renderer process rpc when initialized', async () => {
  directInvoke.mockResolvedValue({ error: false })
  RendererProcess.state.rpc = directRpc

  await expect(RendererProcess.invoke('TestFrameWork.checkSingleElementCondition', { selector: '.Editor' })).resolves.toEqual({ error: false })

  expect(directInvoke).toHaveBeenCalledTimes(1)
  expect(directInvoke).toHaveBeenCalledWith('TestFrameWork.checkSingleElementCondition', { selector: '.Editor' })
})

test('invoke falls back to the renderer worker before initialization', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'TestFrameWork.showOverlay'() {
      return undefined
    },
  })

  await RendererProcess.invoke('TestFrameWork.showOverlay', 'pass', 'green', 'passed')

  expect(mockRpc.invocations).toEqual([['TestFrameWork.showOverlay', 'pass', 'green', 'passed']])
})
