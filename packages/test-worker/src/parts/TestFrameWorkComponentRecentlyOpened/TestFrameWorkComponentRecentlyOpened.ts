import { RendererWorker } from '@lvce-editor/rpc-registry'

export const clear = async (): Promise<void> => {
  await RendererWorker.invoke('RecentlyOpened.clearRecentlyOpened')
}

export const add = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('RecentlyOpened.addToRecentlyOpened', uri)
}

export const get = async (): Promise<readonly string[]> => {
  return RendererWorker.invoke('RecentlyOpened.getRecentlyOpened') as Promise<readonly string[]>
}

export const remove = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('RecentlyOpened.removeRecentlyOpened', uri)
}
