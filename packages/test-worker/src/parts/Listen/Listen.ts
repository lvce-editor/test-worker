import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import { launchEditorWorkerRpc } from '../LaunchEditorWorkerRpc/LaunchEditorWorkerRpc.ts'

export const listen = async (): Promise<void> => {
  EditorWorker.setFactory(launchEditorWorkerRpc)
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  RendererWorker.set(rpc)
}
