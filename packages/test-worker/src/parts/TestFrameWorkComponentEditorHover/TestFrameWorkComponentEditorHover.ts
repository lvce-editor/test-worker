import { RendererWorker } from '@lvce-editor/rpc-registry'

export const show = async (): Promise<void> => {
  await RendererWorker.invoke('Editor.showHover2')
}

export const close = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('EditorHover.close')
}
