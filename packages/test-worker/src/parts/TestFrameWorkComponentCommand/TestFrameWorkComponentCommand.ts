import { RendererWorker } from '@lvce-editor/rpc-registry'

export const execute = async (id: string, ...args: readonly any[]): Promise<any> => {
  return RendererWorker.invoke(id, ...args)
}

export const executeExtensionCommand = async (commandId: string, ...args: readonly any[]): Promise<unknown> => {
  return RendererWorker.invoke('ExtensionHost.executeCommand', commandId, ...args)
}
