import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as InputSource from '../InputSource/InputSource.ts'

export const setValue = async (value: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Search.handleInput', value, InputSource.Script)
}

export const setReplaceValue = async (value: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Search.handleReplaceInput', value, InputSource.Script)
}

export const setExcludeValue = async (value: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Search.handleExcludeInput', value, InputSource.Script)
}

export const replaceAll = async (): Promise<void> => {
  await RendererWorker.invoke('Search.replaceAll')
}

export const setIncludeValue = async (value: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Search.handleIncludeInput', value, InputSource.Script)
}

export const clearSearchResults = async (): Promise<void> => {
  await RendererWorker.invoke('Search.clearSearchResults')
}

export const openDetails = async (): Promise<void> => {
  await RendererWorker.invoke('Search.openDetails')
}

export const collapseDetails = async (): Promise<void> => {
  await RendererWorker.invoke('Search.collapseDetails')
}

export const dismissItem = async (): Promise<void> => {
  await RendererWorker.invoke('Search.dismissItem')
}

export const focusFirst = async (): Promise<void> => {
  await RendererWorker.invoke('Search.focusFirst')
}

export const focusIndex = async (index: number): Promise<void> => {
  await RendererWorker.invoke('Search.focusIndex', index)
}

export const selectIndex = async (index: number): Promise<void> => {
  await RendererWorker.invoke('Search.selectIndex', index)
}

export const focusNext = async (): Promise<void> => {
  await RendererWorker.invoke('Search.focusNext')
}

export const handleWheel = async (deltaMode: number, deltaY: number): Promise<void> => {
  await RendererWorker.invoke('Search.handleWheel', deltaMode, deltaY)
}

export const focusNextPage = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Search.focusPage')
}

export const focusPreviousPage = async (): Promise<void> => {
  await RendererWorker.invoke('Search.focusPreviousPage')
}

export const focusPrevious = async (): Promise<void> => {
  await RendererWorker.invoke('Search.focusPrevious')
}

export const toggleSearchDetails = async (): Promise<void> => {
  await RendererWorker.invoke('Search.toggleSearchDetails')
}

export const toggleMatchCase = async (): Promise<void> => {
  await RendererWorker.invoke('Search.toggleMatchCase')
}

export const toggleMatchWholeWord = async (): Promise<void> => {
  await RendererWorker.invoke('Search.toggleMatchWholeWord')
}

export const togglePreserveCase = async (): Promise<void> => {
  await RendererWorker.invoke('Search.togglePreserveCase')
}

export const toggleUseRegularExpression = async (): Promise<void> => {
  await RendererWorker.invoke('Search.toggleUseRegularExpression')
}

export const toggleReplace = async (): Promise<void> => {
  await RendererWorker.invoke('Search.toggleReplace')
}

export const open = async (): Promise<void> => {
  await RendererWorker.invoke('SideBar.openViewlet', 'Search')
}

export const setLimit = async (limit: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Search.setLimit', limit)
}

export const handleListBlur = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Search.handleListBlur')
}

export const collapseAll = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Search.collapseAll')
}

export const copy = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Search.copy')
}

export const copyPath = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Search.copyPath')
}

export const handleInputCut = async (name: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Search.handleInputCut', name)
}

export const handleInputPaste = async (name: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Search.handleInputPaste', name)
}

export const handleInputCopy = async (name: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Search.handleInputCopy', name)
}

export const handleInputSelectionChange = async (name: string, start: number, end: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Search.handleInputSelectionChange', name, start, end)
}
