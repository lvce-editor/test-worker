import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const setValue = async (value: string) => {
  await Rpc.invoke('Search.handleInput', value)
}
