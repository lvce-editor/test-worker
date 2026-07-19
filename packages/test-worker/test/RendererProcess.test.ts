import type { Rpc } from '@lvce-editor/rpc'
import { afterEach, expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'

const directInvoke = jest.fn<(...params: readonly any[]) => Promise<any>>()
const directRpc = {
  invoke: directInvoke,
} as unknown as Rpc
const create = jest.fn<(_options: any) => Promise<Rpc>>(async () => directRpc)

jest.unstable_mockModule('@lvce-editor/rpc', () => ({
  PlainMessagePortRpcParent: {
    create,
  },
}))

const RendererProcess = await import('../src/parts/RendererProcess/RendererProcess.ts')

afterEach(() => {
  RendererProcess.state.rpc = undefined
  create.mockClear()
  directInvoke.mockReset()
})

test('initialize creates a direct message port rpc', async () => {
  const port = {} as MessagePort

  await RendererProcess.initialize(port)

  expect(create).toHaveBeenCalledTimes(1)
  expect(create).toHaveBeenCalledWith({
    commandMap: {},
    messagePort: port,
  })
  expect(RendererProcess.state.rpc).toBe(directRpc)
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
