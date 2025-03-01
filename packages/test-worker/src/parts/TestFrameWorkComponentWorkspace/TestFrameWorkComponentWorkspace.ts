import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const setPath = async (path: string): Promise<void> => {
  await Rpc.invoke('Workspace.setPath', path)
}
