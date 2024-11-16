import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const execute = async (id: string, ...args: any[]) => {
  return Rpc.invoke(id, ...args)
}
