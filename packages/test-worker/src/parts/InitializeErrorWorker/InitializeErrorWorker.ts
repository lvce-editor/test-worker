import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { ErrorWorker, RendererWorker, RpcId } from '@lvce-editor/rpc-registry'

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToErrorWorker(port, RpcId.TestWorker)
}

export const initializeErrorWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  ErrorWorker.set(rpc)
}
