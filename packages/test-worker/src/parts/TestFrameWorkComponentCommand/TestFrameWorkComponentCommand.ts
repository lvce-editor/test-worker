import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const execute = async (id: string, ...args: readonly any[]): Promise<any> => {
  // @ts-ignore
  return Rpc.invoke(id, ...args)
}
