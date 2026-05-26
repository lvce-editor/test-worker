import { RendererWorker } from '@lvce-editor/rpc-registry'

export const addWebExtension = async (relativePath: string): Promise<void> => {
  // TODO compute absolutePath
  const absolutePath = relativePath
  await RendererWorker.invoke('ExtensionMeta.addWebExtension', absolutePath)
}

export const addNodeExtension = async (relativePath: string): Promise<void> => {
  // TODO compute absolutePath
  const absolutePath = relativePath
  await RendererWorker.invoke('ExtensionMeta.addNodeExtension', absolutePath)
}
