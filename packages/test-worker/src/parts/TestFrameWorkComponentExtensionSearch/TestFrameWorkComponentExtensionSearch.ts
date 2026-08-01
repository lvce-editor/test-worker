import { InputSource } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as SideBar from '../TestFrameWorkComponentSideBar/TestFrameWorkComponentSideBar.ts'

export type ExtensionStatus = 'disabled' | 'enabled' | 'installing' | 'not-installed' | 'uninstalling'
export type ExtensionSearchInputSource = typeof InputSource.Script | typeof InputSource.User

export const acceptCompletion = async (): Promise<void> => {
  await RendererWorker.invoke('Extensions.acceptCompletion')
}

export const closeSuggest = async (): Promise<void> => {
  await RendererWorker.invoke('Extensions.closeSuggest')
}

export const focusFirst = async (): Promise<void> => {
  await RendererWorker.invoke('Extensions.focusFirst')
}

export const focusLast = async (): Promise<void> => {
  await RendererWorker.invoke('Extensions.focusLast')
}

export const focusNext = async (): Promise<void> => {
  await RendererWorker.invoke('Extensions.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await RendererWorker.invoke('Extensions.focusPrevious')
}

export const open = async (): Promise<void> => {
  await SideBar.open('Extensions')
}

export const handleInput = async (
  value: string,
  inputSource: ExtensionSearchInputSource = InputSource.Script,
  cursorOffset: number = value.length,
): Promise<void> => {
  await RendererWorker.invoke('Extensions.handleInput', value, inputSource, cursorOffset)
}

export const handleBlur = async (): Promise<void> => {
  await RendererWorker.invoke('Extensions.handleBlur')
}

export const handleClick = async (index: number): Promise<void> => {
  await RendererWorker.invoke('Extensions.handleClick', index)
}

export const handleClickAt = async (button: number, eventX: number, eventY: number, name: string): Promise<void> => {
  await RendererWorker.invoke('Extensions.handleClickAt', button, eventX, eventY, name)
}

export const handleClickFilter = async (): Promise<void> => {
  await RendererWorker.invoke('Extensions.handleClickFilter')
}

export const handleSettingsButtonClick = async (index: number): Promise<void> => {
  await RendererWorker.invoke('Extensions.handleSettingsButtonClick', index)
}

export const handleUninstall = async (id: string): Promise<void> => {
  await RendererWorker.invoke('Extensions.handleUninstall', id)
}

export const handleContextMenu = async (button: number, x: number, y: number): Promise<void> => {
  await RendererWorker.invoke('Extensions.handleContextMenu', button, x, y)
}

export const copyExtensionInfo = async (): Promise<void> => {
  await RendererWorker.invoke('Extensions.copyExtensionInfo')
}

export const copyExtensionId = async (): Promise<void> => {
  await RendererWorker.invoke('Extensions.copyExtensionId')
}

export const clearSearchResults = async (): Promise<void> => {
  await RendererWorker.invoke('Extensions.clearSearchResults')
}

export const selectNextCompletion = async (): Promise<void> => {
  await RendererWorker.invoke('Extensions.selectNextCompletion')
}

export const selectPreviousCompletion = async (): Promise<void> => {
  await RendererWorker.invoke('Extensions.selectPreviousCompletion')
}

export const setExtensionStatus = async (id: string, status: ExtensionStatus, builtin?: boolean): Promise<void> => {
  if (builtin === undefined) {
    await RendererWorker.invoke('Extensions.setExtensionStatus', id, status)
    return
  }
  await RendererWorker.invoke('Extensions.setExtensionStatus', id, status, builtin)
}
