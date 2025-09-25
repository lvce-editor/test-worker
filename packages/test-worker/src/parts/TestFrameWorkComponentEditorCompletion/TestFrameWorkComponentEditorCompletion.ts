import { RendererWorker } from '@lvce-editor/rpc-registry'

export const selectIndex = async (index: number): Promise<void> => {
  await RendererWorker.invoke('EditorCompletion.selectIndex', index)
}

export const selectCurrentIndex = async (): Promise<void> => {
  await RendererWorker.invoke('EditorCompletion.selectCurrentIndex')
}

export const close = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('EditorCompletion.close')
}

export const handleWheel = async (deltaMode: number, deltaY: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('EditorCompletion.handleWheel', deltaMode, deltaY)
}

export const handlePointerdown = async (clientX: number, clientY: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('EditorCompletion.handlePointerdown', clientX, clientY)
}
