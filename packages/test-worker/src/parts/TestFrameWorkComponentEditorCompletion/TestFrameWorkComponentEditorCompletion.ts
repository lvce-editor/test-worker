import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const selectIndex = async (index: number): Promise<void> => {
  await Rpc.invoke('EditorCompletion.selectIndex', index)
}

export const selectCurrentIndex = async (): Promise<void> => {
  await Rpc.invoke('EditorCompletion.selectCurrentIndex')
}
