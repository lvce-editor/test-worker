import { WebWorkerRpcClient2 } from '@lvce-editor/rpc'
import { commandMap } from '../CommandMap/CommandMap.ts'
import * as Listen from '../Listen/Listen.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const initialize = async (_type: string, port: MessagePort): Promise<void> => {
  await Listen.listen(port)
}

export const main = async (): Promise<void> => {
  const rpc = await WebWorkerRpcClient2.create({
    commandMap: {
      ...commandMap,
      initialize,
    },
  })
  RendererProcess.set(rpc)
}
