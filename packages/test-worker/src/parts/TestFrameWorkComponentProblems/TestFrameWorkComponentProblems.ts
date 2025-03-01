import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const show = async (): Promise<void> => {
  await Rpc.invoke('Panel.selectIndex', 0)
}
