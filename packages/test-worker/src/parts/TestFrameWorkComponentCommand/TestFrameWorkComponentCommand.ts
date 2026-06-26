import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'

export const execute = async (id: string, ...args: readonly any[]): Promise<any> => {
  return RendererWorker.invoke(id, ...args)
}

export const executeExtensionCommand = async (commandId: string, ...args: readonly any[]): Promise<unknown> => {
  try {
    return await ExtensionManagementWorker.invoke('Extensions.executeExtensionCommand', commandId, ...args)
  } catch {
    // legacy
    // TODO maybe ask extension-management-worker instead
    return RendererWorker.invoke('ExtensionHost.executeCommand', commandId, ...args)
  }
}
