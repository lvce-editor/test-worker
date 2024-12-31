import * as InputSource from '../InputSource/InputSource.ts'
import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const setValue = async (value: string) => {
  await Rpc.invoke('Search.handleInput', value, InputSource.Script)
}

export const setReplaceValue = async (value: string) => {
  await Rpc.invoke('Search.handleReplaceInput', value, InputSource.Script)
}

export const setExcludeValue = async (value: string) => {
  await Rpc.invoke('Search.handleExcludeInput', value, InputSource.Script)
}

export const setIncludeValue = async (value: string) => {
  await Rpc.invoke('Search.handleIncludeInput', value, InputSource.Script)
}

export const clearSearchResults = async () => {
  await Rpc.invoke('Search.clearSearchResults')
}

export const dismissItem = async () => {
  await Rpc.invoke('Search.dismissItem')
}

export const focusFirst = async () => {
  await Rpc.invoke('Search.focusFirst')
}

export const focusIndex = async (index: number) => {
  await Rpc.invoke('Search.focusIndex', index)
}

export const focusNext = async () => {
  await Rpc.invoke('Search.focusNext')
}

export const focusNextPage = async () => {
  await Rpc.invoke('Search.focusPage')
}

export const focusPreviousPage = async () => {
  await Rpc.invoke('Search.focusPreviousPage')
}

export const focusPrevious = async () => {
  await Rpc.invoke('Search.focusPrevious')
}

export const toggleMatchCase = async () => {
  await Rpc.invoke('Search.toggleMatchCase')
}

export const toggleMatchWholeWord = async () => {
  await Rpc.invoke('Search.toggleMatchWholeWord')
}

export const togglePreserveCase = async () => {
  await Rpc.invoke('Search.togglePreserveCase')
}

export const toggleUseRegularExpression = async () => {
  await Rpc.invoke('Search.toggleUseRegularExpression')
}
