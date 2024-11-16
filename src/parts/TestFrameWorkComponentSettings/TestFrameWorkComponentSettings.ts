import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const update = (settings: any) => {
  return Rpc.invoke('Preferences.update', settings)
}
