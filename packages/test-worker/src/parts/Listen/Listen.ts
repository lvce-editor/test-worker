import { initializeEditorWorker } from '../InitializeEditorWorker/InitializeEditorWorker.ts'
import { initializeOpenerWorker } from '../InitializeOpenerWorker/InitializeOpenerWorker.ts'
import { initializeRendererWorker } from '../InitializeRendererWorker/InitializeRendererWorker.ts'

export const listen = async (): Promise<void> => {
  await Promise.all([initializeRendererWorker(), initializeEditorWorker(), initializeOpenerWorker()])
}
