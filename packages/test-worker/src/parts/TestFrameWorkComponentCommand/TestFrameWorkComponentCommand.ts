import { RendererWorker } from '@lvce-editor/rpc-registry'

export const execute = async (id: string, ...args: readonly any[]): Promise<any> => {
  return RendererWorker.invoke(id, ...args)
}

export const executeExtensionCommand = async (commandId: string, ...args: readonly any[]): Promise<unknown> => {
  // TODO maybe ask extension-management-worker instead
  return RendererWorker.invoke('ExtensionHost.executeCommand', commandId, ...args)
}
