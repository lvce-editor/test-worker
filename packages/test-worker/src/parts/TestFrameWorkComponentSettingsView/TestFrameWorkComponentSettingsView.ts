import * as InputSource from '../InputSource/InputSource.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const show = async (): Promise<void> => {
  return RendererWorker.invoke('Main.openUri', 'settings://')
}

export const handleInput = async (searchValue: string): Promise<void> => {
  // @ts-ignore
  return RendererWorker.invoke('Settings.handleInput', searchValue, InputSource.Script)
}

export const usePreviousSearchValue = async (): Promise<void> => {
  // @ts-ignore
  return RendererWorker.invoke('Settings.usePreviousSearchValue')
}

export const useNextSearchValue = async (): Promise<void> => {
  // @ts-ignore
  return RendererWorker.invoke('Settings.useNextSearchValue')
}

export const clear = async (searchValue: string): Promise<void> => {
  // @ts-ignore
  return RendererWorker.invoke('Settings.clear', searchValue, InputSource.Script)
}

export const selectTab = async (tabId: string): Promise<void> => {
  // @ts-ignore
  return RendererWorker.invoke('Settings.handleClickTab', tabId)
}

export const selectWorkspace = async (): Promise<void> => {
  await selectTab('workspace')
}

export const selectTextEditor = async (): Promise<void> => {
  await selectTab('text-editor')
}

export const selectExtensions = async (): Promise<void> => {
  await selectTab('extensions')
}
