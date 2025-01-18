import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const selectTab = (name: string): Promise<void> => {
  return Rpc.invoke('ExtensionDetail.selectTab', name)
}
