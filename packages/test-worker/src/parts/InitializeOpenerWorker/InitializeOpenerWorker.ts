import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { OpenerWorker, RendererWorker, RpcId } from '@lvce-editor/rpc-registry'

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToOpenerWorker(port, RpcId.TestWorker)
}

export const initializeOpenerWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  OpenerWorker.set(rpc)
}
