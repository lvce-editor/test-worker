import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const selectItem = async (text: string): Promise<void> => {
  await Rpc.invoke('Menu.selectItem', text)
}
