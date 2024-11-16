import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const open = async (id: string) => {
  await Rpc.invoke('Layout.showPanel', id)
}
