import { RendererWorker } from '@lvce-editor/rpc-registry'

export const setColorTheme = async (id: string): Promise<void> => {
  await RendererWorker.invoke('ColorTheme.setColorTheme', id)
}
