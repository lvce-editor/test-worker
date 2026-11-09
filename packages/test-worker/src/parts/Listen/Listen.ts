import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'

export const listen = async (): Promise<void> => {
  await Promise.all([
    RendererWorker.initializeEditorWorker(),
    RendererWorker.initializeErrorWorkerForWorker(),
    RendererWorker.initializeExtensionManagementWorker(),
    RendererWorker.initializeMainAreaWorkerForWorker(),
    RendererWorker.initializeOpenerWorkerForWorker(),
    RendererWorker.initializeRendererWorkerForWorker(CommandMap.commandMap),
  ])
}
