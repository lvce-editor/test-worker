import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const addWebExtension = async (relativePath: string) => {
  // TODO compute absolutePath
  const absolutePath = relativePath
  await Rpc.invoke('ExtensionMeta.addWebExtension', absolutePath)
}

export const addNodeExtension = async (relativePath: string) => {
  // TODO compute absolutePath
  const absolutePath = relativePath
  await Rpc.invoke('ExtensionMeta.addNodeExtension', absolutePath)
}
