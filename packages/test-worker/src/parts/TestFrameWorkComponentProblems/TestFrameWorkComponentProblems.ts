import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const show = async (): Promise<void> => {
  await Rpc.invoke('Panel.selectIndex', 0)
}
