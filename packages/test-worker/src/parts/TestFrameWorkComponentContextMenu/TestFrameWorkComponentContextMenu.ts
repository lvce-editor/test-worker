import { RendererWorker } from '@lvce-editor/rpc-registry'

export const selectItem = async (text: string): Promise<void> => {
  await RendererWorker.invoke('Menu.selectItem', text)
}
