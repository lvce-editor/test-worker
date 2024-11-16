import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const show = async () => {
  await Rpc.invoke('Panel.selectIndex', 0)
}
