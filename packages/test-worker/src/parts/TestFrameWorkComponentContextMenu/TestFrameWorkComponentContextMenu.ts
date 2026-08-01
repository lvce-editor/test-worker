import { RendererWorker } from '@lvce-editor/rpc-registry'

export const selectIndex = async (level: number, index: number): Promise<void> => {
  await RendererWorker.invoke('Menu.selectIndex', level, index)
}

export const selectItem = async (text: string): Promise<void> => {
  await RendererWorker.invoke('Menu.selectItem', text)
}
