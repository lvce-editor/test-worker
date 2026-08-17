import { afterEach, expect, test } from '@jest/globals'
import type { Rpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as DirectViewWorker from '../src/parts/DirectViewWorker/DirectViewWorker.ts'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'

afterEach(async () => {
  await DirectViewWorker.dispose()
  RendererProcess.state.rpc = undefined
})

test('invokes a view command through a lazy direct worker rpc', async () => {
  const rendererProcessInvocations: any[] = []
  const viewInvocations: any[] = []
  RendererProcess.state.rpc = {
    async invoke(method: string, ...args: readonly any[]) {
      rendererProcessInvocations.push([method, ...args])
      return 42
    },
  } as Rpc
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToViewWorker'(port: MessagePort): undefined {
      port.onmessage = (event: any): void => {
        const { data, target } = event
        viewInvocations.push([data.method, ...data.params])
        target.postMessage({ id: data.id, jsonrpc: '2.0', result: undefined })
      }
      return undefined
    },
  })

  await DirectViewWorker.invoke('Explorer', 'Explorer.focusIndex', 3)
  await DirectViewWorker.invoke('Explorer', 'Explorer.focusNext')

  expect(rendererProcessInvocations).toEqual([
    ['DirectView.getUid', 'Explorer'],
    ['DirectView.getUid', 'Explorer'],
  ])
  expect(mockRpc.invocations).toEqual([['SendMessagePortToExtensionHostWorker.sendMessagePortToViewWorker', expect.anything(), 'Explorer']])
  expect(viewInvocations).toEqual([
    ['Viewlet.executeViewletCommand', 42, 'focusIndex', 3],
    ['Viewlet.executeViewletCommand', 42, 'focusNext'],
  ])
})

test('uses renderer worker before direct connections are initialized', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Explorer.focusIndex'() {},
  })

  await DirectViewWorker.invoke('Explorer', 'Explorer.focusIndex', 3)

  expect(mockRpc.invocations).toEqual([['Explorer.focusIndex', 3]])
})

test('keeps renderer-worker-only commands on renderer worker', async () => {
  RendererProcess.state.rpc = {} as Rpc
  using mockRpc = RendererWorker.registerMockRpc({
    'QuickPick.showCommands'() {},
  })

  await DirectViewWorker.invoke('QuickPick', 'QuickPick.showCommands')

  expect(mockRpc.invocations).toEqual([['QuickPick.showCommands']])
})
