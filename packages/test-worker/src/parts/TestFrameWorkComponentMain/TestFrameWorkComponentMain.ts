import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const openUri = async (uri: string): Promise<void> => {
  await Rpc.invoke('Main.openUri', uri)
}

export const splitRight = async (): Promise<void> => {
  await Rpc.invoke('Main.splitRight')
}

export const openKeyBindings = async (): Promise<void> => {
  await Rpc.invoke('Main.openKeyBindings')
}
