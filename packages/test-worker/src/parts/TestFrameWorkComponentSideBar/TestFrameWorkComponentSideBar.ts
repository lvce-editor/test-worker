import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const open = async (id: string): Promise<void> => {
  await Rpc.invoke('SideBar.openViewlet', id)
}

export const hide = async (): Promise<void> => {
  await Rpc.invoke('Layout.hideSideBar')
}
