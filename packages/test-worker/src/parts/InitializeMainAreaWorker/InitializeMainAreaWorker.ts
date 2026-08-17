import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { MainAreaWorker, RendererWorker, RpcId } from '@lvce-editor/rpc-registry'

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToMainAreaWorker(port, RpcId.TestWorker)
}

export const initializeMainAreaWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  MainAreaWorker.set(rpc)
}
