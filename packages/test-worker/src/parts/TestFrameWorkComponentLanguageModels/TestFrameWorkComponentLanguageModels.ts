import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'

export const open = async (): Promise<void> => {
  await DirectViewWorker.invoke('MainArea', 'Main.openUri', 'language-models:///1')
}

export const handleFilterInput = async (value: string): Promise<void> => {
  await DirectViewWorker.invoke('LanguageModels', 'LanguageModels.handleFilterInput', value)
}

export const clearFilterInput = async (): Promise<void> => {
  await DirectViewWorker.invoke('LanguageModels', 'LanguageModels.clearFilterInput')
}

export const addModel = async (): Promise<void> => {
  await DirectViewWorker.invoke('LanguageModels', 'LanguageModels.addModel')
}

export const removeModel = async (id: string): Promise<void> => {
  await DirectViewWorker.invoke('LanguageModels', 'LanguageModels.removeModel', id)
}
