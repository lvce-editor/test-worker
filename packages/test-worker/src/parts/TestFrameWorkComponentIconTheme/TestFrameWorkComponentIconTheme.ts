import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const setIconTheme = async (id: string): Promise<void> => {
  await Rpc.invoke('IconTheme.setIconTheme', id)
}
