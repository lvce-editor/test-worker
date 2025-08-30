import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'

export const update = (settings: any): Promise<void> => {
  // @ts-ignore
  return Rpc.invoke('Preferences.update', settings)
}
