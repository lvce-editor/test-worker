import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const selectItem = async (text: string): Promise<void> => {
  await Rpc.invoke('Menu.selectItem', text)
}
