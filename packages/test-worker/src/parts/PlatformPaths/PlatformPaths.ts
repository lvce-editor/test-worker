import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getNodePath = (): Promise<string> => {
  return RendererWorker.invoke(/* Platform.getNodePath */ 'Platform.getNodePath')
}
