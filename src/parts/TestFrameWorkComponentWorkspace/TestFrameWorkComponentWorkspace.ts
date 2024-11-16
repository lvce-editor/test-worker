import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const setPath = async (path: string) => {
  await Rpc.invoke('Workspace.setPath', path)
}
