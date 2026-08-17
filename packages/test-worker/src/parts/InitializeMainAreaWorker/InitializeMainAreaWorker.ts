import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { MainAreaWorker, RendererWorker, RpcId } from '@lvce-editor/rpc-registry'

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.invokeAndTransfer(
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMainAreaWorker',
    port,
    'MainArea.handleTestWorkerMessagePort',
    RpcId.TestWorker,
  )
}

export const initializeMainAreaWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  MainAreaWorker.set(rpc)
}
