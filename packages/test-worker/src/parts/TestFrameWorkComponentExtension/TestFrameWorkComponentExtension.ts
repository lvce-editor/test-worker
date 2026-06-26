import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'

export interface FormattingTextDocument {
  readonly documentId?: number
  readonly languageId: string
  readonly text?: string
  readonly uri?: string
}

export interface CompletionTextDocument {
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

export interface CompletionItem {
  readonly label: string
  readonly [key: string]: unknown
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

export const executeCompletionProvider = async (
  textDocument: CompletionTextDocument,
  ...args: readonly unknown[]
): Promise<readonly CompletionItem[]> => {
  return ExtensionManagementWorker.invoke('Extensions.executeCompletionProvider', textDocument, ...args)
}

export const enableWorkspace = async (id: string): Promise<void> => {
  await ExtensionManagementWorker.invoke('Extensions.enableWorkspace', id)
}

export const disableWorkspace = async (id: string): Promise<void> => {
  await ExtensionManagementWorker.invoke('Extensions.disableWorkspace', id)
}

export const addNodeExtension = async (relativePath: string): Promise<void> => {
  // TODO compute absolutePath
  const absolutePath = relativePath
  await RendererWorker.invoke('ExtensionMeta.addNodeExtension', absolutePath)
}
