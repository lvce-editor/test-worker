import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const update = async () => {
  await Rpc.invoke('StatusBar.updateStatusBarItems')
}
