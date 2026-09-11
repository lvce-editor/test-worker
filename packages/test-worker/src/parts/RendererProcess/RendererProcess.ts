import { LazyTransferMessagePortRpcParent, type Rpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const state: { rpc: Rpc | undefined } = {
  rpc: undefined,
}

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToRendererProcess(port, 'TestWorker')
}

// Compatibility for launchers that detach the native worker RPC after startup.
export const initialize = async (): Promise<void> => {
  state.rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
}

export const set = (rpc: Rpc): void => {
  state.rpc = rpc
}

export const isInitialized = (): boolean => {
  return state.rpc !== undefined
}

export const invoke = (method: string, ...params: readonly any[]): Promise<any> => {
  if (state.rpc) {
    return state.rpc.invoke(method, ...params)
  }
  return RendererWorker.invoke(method, ...params)
}
