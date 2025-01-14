import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const setIconTheme = async (id: string): Promise<void> => {
  await Rpc.invoke('IconTheme.setIconTheme', id)
}
