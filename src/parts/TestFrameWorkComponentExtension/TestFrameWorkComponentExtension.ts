import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const addWebExtension = async (relativePath: string): Promise<void> => {
  const absolutePath = relativePath
  await Rpc.invoke('ExtensionMeta.addWebExtension', absolutePath)
}

export const addNodeExtension = async (relativePath: string): Promise<void> => {
  const absolutePath = relativePath
  await Rpc.invoke('ExtensionMeta.addNodeExtension', absolutePath)
}
