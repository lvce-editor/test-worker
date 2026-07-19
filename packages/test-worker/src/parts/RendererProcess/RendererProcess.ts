import { PlainMessagePortRpcParent, type Rpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const state: { rpc: Rpc | undefined } = {
  rpc: undefined,
}

export const initialize = async (port: MessagePort): Promise<void> => {
  state.rpc = await PlainMessagePortRpcParent.create({
    commandMap: {},
    messagePort: port,
  })
}

export const invoke = (method: string, ...params: readonly any[]): Promise<any> => {
  if (state.rpc) {
    return state.rpc.invoke(method, ...params)
  }
  return RendererWorker.invoke(method, ...params)
}
