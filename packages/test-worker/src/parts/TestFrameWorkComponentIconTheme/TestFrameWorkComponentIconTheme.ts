import { RendererWorker } from '@lvce-editor/rpc-registry'

export interface FileIconRequest {
  readonly name: string
}

export const setIconTheme = async (id: string): Promise<void> => {
  await RendererWorker.invoke('IconTheme.setIconTheme', id)
}

export const getFileIcon = async (file: FileIconRequest): Promise<string> => {
  return RendererWorker.invoke('IconTheme.getFileIcon', file)
}
