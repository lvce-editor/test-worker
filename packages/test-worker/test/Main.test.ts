import type { Rpc } from '@lvce-editor/rpc'
import { beforeEach, expect, jest, test } from '@jest/globals'

const listen = jest.fn<(...args: any[]) => Promise<void>>()
const create = jest.fn<(...args: any[]) => Promise<Rpc>>()
const set = jest.fn()

jest.unstable_mockModule('@lvce-editor/rpc', () => ({ WebWorkerRpcClient2: { create } }))
jest.unstable_mockModule('../src/parts/CommandMap/CommandMap.ts', () => ({ commandMap: { test: 'test' } }))
jest.unstable_mockModule('../src/parts/Listen/Listen.ts', () => ({ listen }))
jest.unstable_mockModule('../src/parts/RendererProcess/RendererProcess.ts', () => ({ set }))

const { initialize, main } = await import('../src/parts/Main/Main.ts')

beforeEach(() => {
  jest.resetAllMocks()
})

test('main registers the native worker rpc as the renderer process connection', async () => {
  const rpc = {} as Rpc
  create.mockResolvedValue(rpc)
  await main()
  expect(create).toHaveBeenCalledWith({ commandMap: { initialize, test: 'test' } })
  expect(set).toHaveBeenCalledWith(rpc)
  expect(listen).not.toHaveBeenCalled()
})

test('initialize waits for the renderer worker connection', async () => {
  const { port1, port2 } = new MessageChannel()
  const { promise, resolve } = Promise.withResolvers<void>()
  listen.mockReturnValue(promise)
  const initialized = initialize('message-port', port1)
  expect(listen).toHaveBeenCalledWith(port1)
  resolve()
  await expect(initialized).resolves.toBeUndefined()
  port1.close()
  port2.close()
})

test('main propagates native connection failures', async () => {
  create.mockRejectedValue(new Error('connection failed'))
  await expect(main()).rejects.toThrow('connection failed')
  expect(set).not.toHaveBeenCalled()
})
