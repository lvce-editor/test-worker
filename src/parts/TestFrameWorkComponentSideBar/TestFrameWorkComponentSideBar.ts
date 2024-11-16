import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const open = async (id: string) => {
  await Rpc.invoke('SideBar.openViewlet', id)
}

export const hide = async () => {
  await Rpc.invoke('Layout.hideSideBar')
}
