import { RendererWorker } from '@lvce-editor/rpc-registry'

export const update = async (): Promise<void> => {
  await RendererWorker.invoke('StatusBar.updateStatusBarItems')
}
