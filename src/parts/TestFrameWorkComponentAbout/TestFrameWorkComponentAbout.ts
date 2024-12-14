import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const show = async () => {
  return Rpc.invoke('About.showAbout')
}
