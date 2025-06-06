import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const getNodePath = (): Promise<string> => {
  // @ts-ignore
  return Rpc.invoke(/* Platform.getNodePath */ 'Platform.getNodePath')
}
