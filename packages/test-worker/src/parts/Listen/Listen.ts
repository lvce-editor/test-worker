import { PlainMessagePortRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'

const initializeRendererWorker = async (port: MessagePort): Promise<void> => {
  const rpc = await PlainMessagePortRpc.create({
    commandMap: CommandMap.commandMap,
    messagePort: port,
  })
  RendererWorker.set(rpc)
}

export const listen = async (port: MessagePort): Promise<void> => {
  await Promise.all([
    RendererWorker.initializeEditorWorker(),
    RendererWorker.initializeErrorWorkerForWorker(),
    RendererWorker.initializeExtensionManagementWorker(),
    RendererWorker.initializeMainAreaWorkerForWorker(),
    RendererWorker.initializeOpenerWorkerForWorker(),
    initializeRendererWorker(port),
  ])
}
