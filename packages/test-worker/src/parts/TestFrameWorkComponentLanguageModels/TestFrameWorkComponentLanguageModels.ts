import { RendererWorker } from '@lvce-editor/rpc-registry'

export const open = async (): Promise<void> => {
  await RendererWorker.invoke('Main.openUri', 'language-models:///1')
}

export const handleFilterInput = async (value: string): Promise<void> => {
  await RendererWorker.invoke('LanguageModels.handleFilterInput', value)
}

export const clearFilterInput = async (): Promise<void> => {
  await RendererWorker.invoke('LanguageModels.clearFilterInput')
}

export const addModel = async (): Promise<void> => {
  await RendererWorker.invoke('LanguageModels.addModel')
}

export const removeModel = async (id: string): Promise<void> => {
  await RendererWorker.invoke('LanguageModels.removeModel', id)
}
