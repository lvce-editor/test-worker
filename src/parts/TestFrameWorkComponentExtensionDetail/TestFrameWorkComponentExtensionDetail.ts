import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const selectFeature = (name: string): Promise<void> => {
  return Rpc.invoke('ExtensionDetail.selectFeature', name)
}

export const selectTab = (name: string): Promise<void> => {
  return Rpc.invoke('ExtensionDetail.selectTab', name)
}
