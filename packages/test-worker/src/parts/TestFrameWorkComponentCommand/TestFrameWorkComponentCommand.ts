import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'

export const execute = async (id: string, ...args: readonly any[]): Promise<any> => {
  return RendererWorker.invoke(id, ...args)
}

export const executeExtensionCommand = async (commandId: string, ...args: readonly any[]): Promise<unknown> => {
  let shouldRetry = true
  try {
    const result = await ExtensionManagementWorker.invoke('Extensions.executeExtensionCommand', commandId, ...args)
    shouldRetry = false
    if (result && !result.wasFound) {
      throw new Error(`command ${commandId} was not found`)
    }
    return result.result
  } catch (error) {
    if (shouldRetry) {
      // legacy
      // TODO maybe ask extension-management-worker instead
      return await RendererWorker.invoke('ExtensionHost.executeCommand', commandId, ...args)
    } else {
      throw error
    }
  }
}
