import { initializeEditorWorker } from '../InitializeEditorWorker/InitializeEditorWorker.ts'
import { initializeErrorWorker } from '../InitializeErrorWorker/InitializeErrorWorker.ts'
import { initializeExtensionManagementWorker } from '../InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'
import { initializeMainAreaWorker } from '../InitializeMainAreaWorker/InitializeMainAreaWorker.ts'
import { initializeOpenerWorker } from '../InitializeOpenerWorker/InitializeOpenerWorker.ts'
import { initializeRendererWorker } from '../InitializeRendererWorker/InitializeRendererWorker.ts'

export const listen = async (): Promise<void> => {
  await Promise.all([
    initializeEditorWorker(),
    initializeErrorWorker(),
    initializeExtensionManagementWorker(),
    initializeMainAreaWorker(),
    initializeOpenerWorker(),
    initializeRendererWorker(),
  ])
}
