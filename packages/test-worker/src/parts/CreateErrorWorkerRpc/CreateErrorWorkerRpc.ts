import { type Rpc, PlainMessagePortRpcParent } from '@lvce-editor/rpc'
import { VError } from '@lvce-editor/verror'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import { sendMessagePortToErrorWorker } from '../SendMessagePortToErrorWorker/SendMessagePortToErrorWorker.ts'

export const createErrorWorkerRpc = async (): Promise<Rpc> => {
  try {
    const { port1, port2 } = GetPortTuple.getPortTuple()
    await sendMessagePortToErrorWorker(port2)
    const rpc = await PlainMessagePortRpcParent.create({
      commandMap: {},
      messagePort: port1,
    })
    return rpc
  } catch (error) {
    throw new VError(error, `Failed to create error worker rpc`)
  }
}
