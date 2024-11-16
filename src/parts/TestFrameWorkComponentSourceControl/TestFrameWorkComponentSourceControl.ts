import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const acceptInput = async () => {
  await Rpc.invoke('Source Control.acceptInput')
}

export const handleInput = async (text: string) => {
  await Rpc.invoke('Source Control.handleInput', text)
}
