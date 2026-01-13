import { initializeEditorWorker } from '../InitializeEditorWorker/InitializeEditorWorker.ts'
import { initializeRendererWorker } from '../InitializeRendererWorker/InitializeRendererWorker.ts'

export const listen = async (): Promise<void> => {
  await Promise.all([initializeRendererWorker(), initializeEditorWorker()])
}
