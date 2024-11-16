import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const getNodePath = () => {
  return Rpc.invoke(/* Platform.getNodePath */ 'Platform.getNodePath')
}
