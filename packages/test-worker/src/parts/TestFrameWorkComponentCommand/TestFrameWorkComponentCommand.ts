import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'

export const execute = async (id: string, ...args: readonly any[]): Promise<any> => {
  // @ts-ignore
  return Rpc.invoke(id, ...args)
}
