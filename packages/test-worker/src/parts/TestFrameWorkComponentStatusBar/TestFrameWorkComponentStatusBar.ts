import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const update = async (): Promise<void> => {
  await Rpc.invoke('StatusBar.updateStatusBarItems')
}
