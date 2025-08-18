import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

const send = async (port: MessagePort): Promise<void> => {
  const rpcId = 9001
  await RendererWorker.sendMessagePortToEditorWorker(port, rpcId)
}

export const launchEditorWorkerRpc = async () => {
  const rpc = await TransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  return rpc
}
