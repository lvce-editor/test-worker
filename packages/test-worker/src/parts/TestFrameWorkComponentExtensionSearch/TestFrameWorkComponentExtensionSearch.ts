import { InputSource } from '@lvce-editor/constants'
import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'
import * as SideBar from '../TestFrameWorkComponentSideBar/TestFrameWorkComponentSideBar.ts'

export type ExtensionStatus = 'disabled' | 'enabled' | 'installing' | 'not-installed' | 'uninstalling'
export type ExtensionSearchInputSource = 1 | 2

export const acceptCompletion = async (): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.acceptCompletion')
}

export const closeSuggest = async (): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.closeSuggest')
}

export const focusFirst = async (): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.focusFirst')
}

export const focusLast = async (): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.focusLast')
}

export const focusNext = async (): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.focusPrevious')
}

export const open = async (): Promise<void> => {
  await SideBar.open('Extensions')
}

export const handleInput = async (
  value: string,
  inputSource: ExtensionSearchInputSource = InputSource.Script,
  cursorOffset: number = value.length,
): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.handleInput', value, inputSource, cursorOffset)
}

export const handleBlur = async (): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.handleBlur')
}

export const handleClick = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.handleClick', index)
}

export const handleClickAt = async (button: number, eventX: number, eventY: number, name: string): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.handleClickAt', button, eventX, eventY, name)
}

export const handleClickFilter = async (): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.handleClickFilter')
}

export const handleSettingsButtonClick = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.handleSettingsButtonClick', index)
}

export const handleUninstall = async (id: string): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.handleUninstall', id)
}

export const handleContextMenu = async (button: number, x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.handleContextMenu', button, x, y)
}

export const copyExtensionInfo = async (): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.copyExtensionInfo')
}

export const copyExtensionId = async (): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.copyExtensionId')
}

export const clearSearchResults = async (): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.clearSearchResults')
}

export const selectNextCompletion = async (): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.selectNextCompletion')
}

export const selectPreviousCompletion = async (): Promise<void> => {
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.selectPreviousCompletion')
}

export const setExtensionStatus = async (id: string, status: ExtensionStatus, builtin?: boolean): Promise<void> => {
  if (builtin === undefined) {
    await DirectViewWorker.invoke('SearchExtensions', 'Extensions.setExtensionStatus', id, status)
    return
  }
  await DirectViewWorker.invoke('SearchExtensions', 'Extensions.setExtensionStatus', id, status, builtin)
}
