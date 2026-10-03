import { RendererWorker } from '@lvce-editor/rpc-registry'

export const setIconTheme = async (id: string): Promise<void> => {
  await RendererWorker.invoke('IconTheme.setIconTheme', id)
}

export const getFileIcon = async (file: { name: string }): Promise<string> => {
  return RendererWorker.invoke('IconTheme.getFileIcon', file)
}
