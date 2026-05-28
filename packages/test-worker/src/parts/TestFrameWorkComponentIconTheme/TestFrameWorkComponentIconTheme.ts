import { RendererWorker } from '@lvce-editor/rpc-registry'

export const setIconTheme = async (id: string): Promise<void> => {
  await RendererWorker.invoke('IconTheme.setIconTheme', id)
}
