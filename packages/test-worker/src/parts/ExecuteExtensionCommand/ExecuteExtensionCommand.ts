import { RendererWorker } from '@lvce-editor/rpc-registry'

export const executeExtensionCommand = async (commandId: string, ...args: readonly any[]): Promise<unknown> => {
  return RendererWorker.invoke('ExtensionHost.executeCommand', commandId, ...args)
}
