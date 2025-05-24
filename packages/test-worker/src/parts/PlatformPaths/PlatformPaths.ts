import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const getNodePath = (): Promise<string> => {
  return Rpc.invoke(/* Platform.getNodePath */ 'Platform.getNodePath')
}
