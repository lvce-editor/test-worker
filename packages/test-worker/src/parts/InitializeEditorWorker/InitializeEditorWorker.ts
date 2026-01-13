import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { EditorWorker, RendererWorker, RpcId } from '@lvce-editor/rpc-registry'

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToEditorWorker(port, RpcId.TestWorker)
}
export const initializeEditorWorker = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  EditorWorker.set(rpc)
}
