import { type Rpc, TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { VError } from '@lvce-editor/verror'
import { sendMessagePortToErrorWorker } from '../SendMessagePortToErrorWorker/SendMessagePortToErrorWorker.ts'

export const createErrorWorkerRpc = async (): Promise<Rpc> => {
  try {
    const rpc = await TransferMessagePortRpcParent.create({
      commandMap: {},
      send: sendMessagePortToErrorWorker,
    })
    return rpc
  } catch (error) {
    throw new VError(error, `Failed to create error worker rpc`)
  }
}
