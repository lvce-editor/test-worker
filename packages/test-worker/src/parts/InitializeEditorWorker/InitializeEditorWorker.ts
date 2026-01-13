import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import { launchEditorWorkerRpc } from '../LaunchEditorWorkerRpc/LaunchEditorWorkerRpc.ts'

export const initializeEditorWorker = async (): Promise<void> => {
  // TODO use lazyrpc
  EditorWorker.setFactory(launchEditorWorkerRpc)
}
