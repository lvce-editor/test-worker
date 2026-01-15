import { RendererWorker } from '@lvce-editor/rpc-registry'

export const open = async (id: string): Promise<void> => {
  await RendererWorker.invoke('Layout.showPanel', id)
}

export const openProblems = async (): Promise<void> => {
  await open('Problems')

  await RendererWorker.invoke('Panel.selectIndex', 0)
}
