import { RendererWorker } from '@lvce-editor/rpc-registry'

export const show2 = async (uid: number, menuId: number, x: number, y: number, ...args: unknown[]): Promise<void> => {
  await RendererWorker.invoke('ContextMenu.show2', uid, menuId, x, y, ...args)
}

export const selectIndex = async (level: number, index: number): Promise<void> => {
  await RendererWorker.invoke('Menu.selectIndex', level, index)
}

export const selectItem = async (text: string): Promise<void> => {
  await RendererWorker.invoke('Menu.selectItem', text)
}
