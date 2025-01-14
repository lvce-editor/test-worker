import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const execute = async (id: string, ...args: any[]): Promise<any> => {
  return Rpc.invoke(id, ...args)
}
