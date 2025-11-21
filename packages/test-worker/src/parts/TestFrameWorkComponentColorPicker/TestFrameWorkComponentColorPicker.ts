import { RendererWorker } from '@lvce-editor/rpc-registry'

export const setRelativeX = async (x: number): Promise<void> => {
  await RendererWorker.invoke('ColorPicker.setRelativeX', x)
}
