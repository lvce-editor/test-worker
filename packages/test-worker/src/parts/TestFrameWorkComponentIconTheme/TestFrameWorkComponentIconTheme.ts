import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'

export const setIconTheme = async (id: string): Promise<void> => {
  await Rpc.invoke('IconTheme.setIconTheme', id)
}
