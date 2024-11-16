import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const setIconTheme = async (id: string) => {
  await Rpc.invoke('IconTheme.setIconTheme', id)
}
