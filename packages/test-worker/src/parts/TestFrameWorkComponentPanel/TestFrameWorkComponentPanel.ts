import { RendererWorker } from '@lvce-editor/rpc-registry'

export const close = async (): Promise<void> => {
  await RendererWorker.invoke('Panel.handleClickClose')
}

export const hide = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.hidePanel')
}

export const open = async (id: string): Promise<void> => {
  await RendererWorker.invoke('Layout.showPanel', id)
}

export const openProblems = async (): Promise<void> => {
  await open('Problems')

  await RendererWorker.invoke('Panel.selectIndex', 0)
}

export const select = async (name: string): Promise<void> => {
  await RendererWorker.invoke('Panel.selectName', name)
}

export const maximize = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.maximizePanel')
}

export const unmaximize = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.unmaximizePanel')
}
