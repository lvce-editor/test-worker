import { RendererWorker } from '@lvce-editor/rpc-registry'

export const load = async (url: string): Promise<void> => {
  await RendererWorker.invoke('Audio.load', url)
}

export const play = async (url: string): Promise<void> => {
  await RendererWorker.invoke('Audio.play', url)
}

export const pause = async (): Promise<void> => {
  await RendererWorker.invoke('Audio.pause')
}
