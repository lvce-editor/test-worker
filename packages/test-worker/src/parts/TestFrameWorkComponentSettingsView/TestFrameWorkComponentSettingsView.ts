import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const show = async (): Promise<void> => {
  return Rpc.invoke('Main.openUri', 'settings://')
}

// TODO
