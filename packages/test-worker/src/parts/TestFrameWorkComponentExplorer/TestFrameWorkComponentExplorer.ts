import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export interface ExplorerSavedState {
  readonly deltaY: number
  readonly expandedPaths: readonly string[]
  readonly maxLineY: number
  readonly minLineY: number
  readonly root: string
}

export const openContextMenu = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleContextMenuKeyboard', index)
}

export const handleDragLeave = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleDragLeave')
}

export const handleBlur = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleBlur')
}

export const handleEscape = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleEscape')
}

export const handleDropIndex = async (
  fileHandles: readonly FileSystemHandle[],
  files: readonly any[],
  paths: readonly string[],
  index: number,
): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleDropIndex', fileHandles, files, paths, index)
}

export const handleInputBlur = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleInputBlur')
}

export const focus = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.focusIndex', -1)
}

export const setDeltaY = async (deltaY: number): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.setDeltaY', deltaY)
}

export const focusNext = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.focusNext')
}

export const focusNone = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.focusNone')
}

export const focusPrevious = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.focusPrevious')
}

export const selectUp = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.selectUp')
}

export const handleDragOverIndex = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleDragOverIndex', index)
}

export const selectDown = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.selectDown')
}

export const collapseAll = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.collapseAll')
}

export const refresh = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.refresh')
}

export const focusIndex = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.focusIndex', index)
}

export const clickCurrent = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleClickCurrent')
}

export const handleArrowLeft = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleArrowLeft')
}

export const handleArrowRight = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleArrowRight')
}

export const focusLast = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.focusLast')
}

export const focusFirst = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.focusFirst')
}

export const removeDirent = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.removeDirent')
}

export const expandRecursively = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.expandRecursively')
}

export const newFile = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.newFile')
}

export const newFolder = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.newFolder')
}

export const copyPath = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.copyPath')
}

export const copyRelativePath = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.copyRelativePath')
}

export const handleClick = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleClick', index)
}

export const handleClickAt = async (
  preventDefault: boolean,
  button: number,
  ctrlKey: boolean,
  shiftKey: boolean,
  x: number,
  y: number,
): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleClickAt', preventDefault, button, ctrlKey, shiftKey, x, y)
}

export const handleClickOpenFolder = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleClickOpenFolder')
}

export const handleDoubleClick = async (eventX: number, eventY: number): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleDoubleClick', eventX, eventY)
}

export const handleDrop = async (x: number, y: number, fileIds: readonly number[], fileList: FileList | readonly File[]): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleDrop', x, y, fileIds, fileList)
}

export const handleKeyDown = async (defaultPrevented: boolean, key: string): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleKeyDown', defaultPrevented, key)
}

export const rename = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.renameDirent')
}

export const selectAll = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.selectAll')
}

export const renameDirent = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.renameDirent')
}

export const cancelEdit = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.cancelEdit')
}

export const acceptEdit = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.acceptEdit')
}

export const updateEditingValue = async (value: string): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.updateEditingValue', value)
}

export const expandAll = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.expandAll')
}

export const handleDragOver = async (x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleDragOver', x, y)
}

export const handleCut = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleCut')
}

export const handleCopy = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handleCopy')
}

export const handlePaste = async (): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.handlePaste')
}

export const selectIndices = async (indices: readonly number[]): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.selectIndices', indices)
}

export const toggleIndividualSelection = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.toggleIndividualSelection', index)
}

export const restoreState = async (savedState?: ExplorerSavedState): Promise<void> => {
  if (savedState === undefined) {
    await DirectViewWorker.invoke('Explorer', 'Explorer.restoreState')
    return
  }
  await DirectViewWorker.invoke('Explorer', 'Explorer.restoreState', savedState)
}

export const reveal = async (uri: string): Promise<void> => {
  await DirectViewWorker.invoke('Explorer', 'Explorer.reveal', uri)
}

export const saveState = async (): Promise<ExplorerSavedState> => {
  return RendererWorker.invoke('Explorer.saveState')
}
