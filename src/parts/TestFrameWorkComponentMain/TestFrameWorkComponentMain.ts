import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const openUri = async (uri: string) => {
  await Rpc.invoke('Main.openUri', uri)
}

export const splitRight = async () => {
  await Rpc.invoke('Main.splitRight')
}

export const openKeyBindings = async () => {
  await Rpc.invoke('Main.openKeyBindings')
}
