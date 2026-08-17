import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchInputType } from '../SearchInputType/SearchInputType.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as SideBar from '../TestFrameWorkComponentSideBar/TestFrameWorkComponentSideBar.ts'

export const show = async (): Promise<void> => {
  await SideBar.open('Search')
}

export const setValue = async (value: string): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.handleInput', value, InputSource.Script)
}

export const setReplaceValue = async (value: string): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.handleReplaceInput', value, InputSource.Script)
}

export const setExcludeValue = async (value: string): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.handleExcludeInput', value, InputSource.Script)
}

export const replaceAll = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.replaceAll')
}

export const setIncludeValue = async (value: string): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.handleIncludeInput', value, InputSource.Script)
}

export const clearSearchResults = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.clearSearchResults')
}

export const openDetails = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.openDetails')
}

export const collapseDetails = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.collapseDetails')
}

export const dismissItem = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.dismissItem')
}

export const focusFirst = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.focusFirst')
}

export const focusIndex = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.focusIndex', index)
}

export const selectIndex = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.selectIndex', index)
}

export const focusNext = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.focusNext')
}

export const handleWheel = async (deltaMode: number, deltaY: number): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.handleWheel', deltaMode, deltaY)
}

export const focusNextPage = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.focusPage')
}

export const focusPreviousPage = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.focusPreviousPage')
}

export const focusPrevious = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.focusPrevious')
}

export const toggleSearchDetails = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.toggleSearchDetails')
}

export const toggleMatchCase = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.toggleMatchCase')
}

export const toggleMatchWholeWord = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.toggleMatchWholeWord')
}

export const togglePreserveCase = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.togglePreserveCase')
}

export const toggleUseRegularExpression = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.toggleUseRegularExpression')
}

export const toggleReplace = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.toggleReplace')
}

export const open = async (): Promise<void> => {
  await RendererWorker.invoke('SideBar.openViewlet', 'Search')
}

export const setLimit = async (limit: number): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.setLimit', limit)
}

export const handleListBlur = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.handleListBlur')
}

export const collapseAll = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.collapseAll')
}

export const copy = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.copy')
}

export const copyPath = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.copyPath')
}

export const handleInputCut = async (name: SearchInputType): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.handleInputCut', name)
}

export const handleInputPaste = async (name: SearchInputType): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.handleInputPaste', name)
}

export const handleInputCopy = async (name: SearchInputType): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.handleInputCopy', name)
}

export const handleInputSelectionChange = async (name: SearchInputType, start: number, end: number): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.handleInputSelectionChange', name, start, end)
}

export const handleInputContextMenu = async (name: SearchInputType, button: number, x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.handleInputConextMenu', name, button, x, y)
}

export const handleContextMenu = async (button: number, x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.handleContextMenu', button, x, y)
}

export const enableRenderFolderPaths = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.enableRenderFolderPaths')
}

export const disableRenderFolderPaths = async (): Promise<void> => {
  await DirectViewWorker.invoke('TextSearch', 'Search.disableRenderFolderPaths')
}
