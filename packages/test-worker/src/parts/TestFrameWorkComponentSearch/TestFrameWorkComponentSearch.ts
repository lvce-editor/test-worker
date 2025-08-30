import * as InputSource from '../InputSource/InputSource.ts'
import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'

export const setValue = async (value: string): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Search.handleInput', value, InputSource.Script)
}

export const setReplaceValue = async (value: string): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Search.handleReplaceInput', value, InputSource.Script)
}

export const setExcludeValue = async (value: string): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Search.handleExcludeInput', value, InputSource.Script)
}

export const replaceAll = async (): Promise<void> => {
  await Rpc.invoke('Search.replaceAll')
}

export const setIncludeValue = async (value: string): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Search.handleIncludeInput', value, InputSource.Script)
}

export const clearSearchResults = async (): Promise<void> => {
  await Rpc.invoke('Search.clearSearchResults')
}

export const openDetails = async (): Promise<void> => {
  await Rpc.invoke('Search.openDetails')
}

export const collapseDetails = async (): Promise<void> => {
  await Rpc.invoke('Search.collapseDetails')
}

export const dismissItem = async (): Promise<void> => {
  await Rpc.invoke('Search.dismissItem')
}

export const focusFirst = async (): Promise<void> => {
  await Rpc.invoke('Search.focusFirst')
}

export const focusIndex = async (index: number): Promise<void> => {
  await Rpc.invoke('Search.focusIndex', index)
}

export const selectIndex = async (index: number): Promise<void> => {
  await Rpc.invoke('Search.selectIndex', index)
}

export const focusNext = async (): Promise<void> => {
  await Rpc.invoke('Search.focusNext')
}

export const handleWheel = async (deltaMode: number, deltaY: number): Promise<void> => {
  await Rpc.invoke('Search.handleWheel', deltaMode, deltaY)
}

export const focusNextPage = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Search.focusPage')
}

export const focusPreviousPage = async (): Promise<void> => {
  await Rpc.invoke('Search.focusPreviousPage')
}

export const focusPrevious = async (): Promise<void> => {
  await Rpc.invoke('Search.focusPrevious')
}

export const toggleSearchDetails = async (): Promise<void> => {
  await Rpc.invoke('Search.toggleSearchDetails')
}

export const toggleMatchCase = async (): Promise<void> => {
  await Rpc.invoke('Search.toggleMatchCase')
}

export const toggleMatchWholeWord = async (): Promise<void> => {
  await Rpc.invoke('Search.toggleMatchWholeWord')
}

export const togglePreserveCase = async (): Promise<void> => {
  await Rpc.invoke('Search.togglePreserveCase')
}

export const toggleUseRegularExpression = async (): Promise<void> => {
  await Rpc.invoke('Search.toggleUseRegularExpression')
}

export const toggleReplace = async (): Promise<void> => {
  await Rpc.invoke('Search.toggleReplace')
}
