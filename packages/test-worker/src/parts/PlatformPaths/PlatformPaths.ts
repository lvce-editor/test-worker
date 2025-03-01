import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const getNodePath = (): Promise<string> => {
  return Rpc.invoke(/* Platform.getNodePath */ 'Platform.getNodePath')
}
