import { RendererWorker } from '@lvce-editor/rpc-registry'

export const open = async (id: string): Promise<void> => {
  await RendererWorker.invoke('SideBar.openViewlet', id)
}

export const hide = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.hideSideBar')
}
