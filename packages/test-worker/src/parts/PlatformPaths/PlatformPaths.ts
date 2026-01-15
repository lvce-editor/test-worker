import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'

export const getNodePath = (): Promise<string> => {
  return Rpc.invoke(/* Platform.getNodePath */ 'Platform.getNodePath')
}
