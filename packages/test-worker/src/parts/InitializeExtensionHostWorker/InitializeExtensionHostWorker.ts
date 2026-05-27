import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { ExtensionHost, RendererWorker, RpcId } from '@lvce-editor/rpc-registry'

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToExtensionHostWorker(port, RpcId.TestWorker)
}

export const initializeExtensionHostWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  ExtensionHost.set(rpc)
}
