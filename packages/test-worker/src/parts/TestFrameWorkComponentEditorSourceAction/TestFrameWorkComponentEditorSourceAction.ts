import { RendererWorker } from '@lvce-editor/rpc-registry'

export const selectIndex = async (index: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('EditorSourceAction.selectIndex', index)
}

export const selectCurrentIndex = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('EditorSourceAction.selectCurrentIndex')
}
