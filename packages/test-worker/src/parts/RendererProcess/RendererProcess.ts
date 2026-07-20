import { LazyTransferMessagePortRpcParent, type Rpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const state: { rpc: Rpc | undefined } = {
  rpc: undefined,
}

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToRendererProcess(port)
}

export const initialize = async (): Promise<void> => {
  state.rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
}

export const invoke = (method: string, ...params: readonly any[]): Promise<any> => {
  if (state.rpc) {
    return state.rpc.invoke(method, ...params)
  }
  return RendererWorker.invoke(method, ...params)
}
