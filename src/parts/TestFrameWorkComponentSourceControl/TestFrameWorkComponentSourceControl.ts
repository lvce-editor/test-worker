import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const acceptInput = async (): Promise<void> => {
  await Rpc.invoke('Source Control.acceptInput')
}

export const handleInput = async (text: string): Promise<void> => {
  await Rpc.invoke('Source Control.handleInput', text)
}
