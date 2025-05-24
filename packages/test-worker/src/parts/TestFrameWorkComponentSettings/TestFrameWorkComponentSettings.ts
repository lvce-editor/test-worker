import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const update = (settings: any): Promise<void> => {
  return Rpc.invoke('Preferences.update', settings)
}
