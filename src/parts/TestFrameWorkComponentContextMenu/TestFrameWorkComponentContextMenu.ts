import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const selectItem = async (text: string) => {
  await Rpc.invoke('Menu.selectItem', text)
}
