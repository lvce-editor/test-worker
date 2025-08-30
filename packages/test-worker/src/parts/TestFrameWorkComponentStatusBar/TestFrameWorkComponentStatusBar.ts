import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'

export const update = async (): Promise<void> => {
  await Rpc.invoke('StatusBar.updateStatusBarItems')
}
