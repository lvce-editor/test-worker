import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const update = (settings: any): Promise<void> => {
  return Rpc.invoke('Preferences.update', settings)
}
