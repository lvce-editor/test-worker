import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'

export const selectItem = async (text: string): Promise<void> => {
  await Rpc.invoke('Menu.selectItem', text)
}
