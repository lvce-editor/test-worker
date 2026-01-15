import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as InputSource from '../InputSource/InputSource.ts'

export const show = async (): Promise<void> => {
  return RendererWorker.invoke('Main.openUri', 'settings://')
}

export const handleInput = async (searchValue: string): Promise<void> => {
  return RendererWorker.invoke('Settings.handleInput', searchValue, InputSource.Script)
}

export const usePreviousSearchValue = async (): Promise<void> => {
  return RendererWorker.invoke('Settings.usePreviousSearchValue')
}

export const useNextSearchValue = async (): Promise<void> => {
  return RendererWorker.invoke('Settings.useNextSearchValue')
}

export const clear = async (searchValue: string): Promise<void> => {
  return RendererWorker.invoke('Settings.clear', searchValue, InputSource.Script)
}

export const clearHistory = async (): Promise<void> => {
  return RendererWorker.invoke('Settings.clearHistory')
}

export const selectTab = async (tabId: string): Promise<void> => {
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

export const selectWindow = async (): Promise<void> => {
  await selectTab('window')
}

export const handleScroll = async (scrollTop: number): Promise<void> => {
  await RendererWorker.invoke('Settings.handleScroll', scrollTop, InputSource.Script)
}

export const handleClickFilterButton = async (x: number, y: number): Promise<void> => {
  await RendererWorker.invoke('Settings.handleClickFilterButton', x, y)
}
