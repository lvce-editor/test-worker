import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const selectTab = (name: string): Promise<void> => {
  return Rpc.invoke('ExtensionDetail.selectTab', name)
}

export const open = (extensionId: string): Promise<void> => {
  const uri = `extension-detail://${extensionId}`
  return Rpc.invoke('Main.openUri', uri)
}
