import { RendererWorker } from '@lvce-editor/rpc-registry'

export const clear = async (): Promise<void> => {
  // @ts-ignore
  return RendererWorker.invoke('References.clear')
}

export const collapseAll = async (): Promise<void> => {
  // @ts-ignore
  return RendererWorker.invoke('References.collapseAll')
}

export const refresh = async (): Promise<void> => {
  // @ts-ignore
  return RendererWorker.invoke('References.refresh')
}
