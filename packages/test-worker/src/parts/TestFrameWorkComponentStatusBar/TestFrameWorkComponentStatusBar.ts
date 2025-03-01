import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const update = async (): Promise<void> => {
  await Rpc.invoke('StatusBar.updateStatusBarItems')
}
