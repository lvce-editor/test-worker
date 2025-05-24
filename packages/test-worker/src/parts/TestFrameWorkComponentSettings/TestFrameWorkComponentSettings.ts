import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const update = (settings: any): Promise<void> => {
  // @ts-ignore
  return Rpc.invoke('Preferences.update', settings)
}
