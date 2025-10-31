import { RendererWorker } from '@lvce-editor/rpc-registry'

export const open = async (): Promise<void> => {
  await RendererWorker.invoke('SideBar.openViewlet', 'Extensions')
}
