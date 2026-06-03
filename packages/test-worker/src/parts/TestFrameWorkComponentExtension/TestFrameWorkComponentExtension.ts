import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'

export interface FormattingTextDocument {
  readonly documentId?: number
  readonly languageId: string
  readonly text?: string
  readonly uri?: string
}

export interface FormattingEdit {
  readonly endOffset: number
  readonly inserted: string
  readonly startOffset: number
}

export const addWebExtension = async (relativePath: string): Promise<void> => {
  // TODO compute absolutePath
  const absolutePath = relativePath
  await ExtensionManagementWorker.invoke('Extensions.addWebExtension', absolutePath)
  await RendererWorker.invoke('ExtensionMeta.addWebExtension', absolutePath)
}

export const executeFormattingProvider = async (
  textDocument: FormattingTextDocument,
  ...args: readonly unknown[]
): Promise<readonly FormattingEdit[]> => {
  return ExtensionManagementWorker.invoke('Extensions.executeFormattingProvider', textDocument, ...args)
}

export const addNodeExtension = async (relativePath: string): Promise<void> => {
  // TODO compute absolutePath
  const absolutePath = relativePath
  await RendererWorker.invoke('ExtensionMeta.addNodeExtension', absolutePath)
}
