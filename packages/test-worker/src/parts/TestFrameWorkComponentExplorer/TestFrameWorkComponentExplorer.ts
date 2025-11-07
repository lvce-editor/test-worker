 
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const openContextMenu = async (index: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Explorer.handleContextMenuKeyboard', index)
}

export const handleDragLeave = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.handleDragLeave')
}

export const handleBlur = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.handleBlur')
}

export const handleEscape = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Explorer.handleEscape')
}

export const handleInputBlur = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.handleInputBlur')
}

export const focus = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.focusIndex', -1)
}

export const focusNext = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Explorer.focusNext')
}

export const selectUp = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.selectUp')
}

export const handleDragOverIndex = async (index: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Explorer.handleDragOverIndex', index)
}

export const selectDown = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.selectDown')
}

export const collapseAll = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Explorer.collapseAll')
}

export const refresh = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.refresh')
}

export const focusIndex = async (index: number): Promise<void> => {
  await RendererWorker.invoke('Explorer.focusIndex', index)
}

export const clickCurrent = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.handleClickCurrent')
}

export const handleArrowLeft = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.handleArrowLeft')
}

export const focusLast = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.focusLast')
}

export const focusFirst = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.focusFirst')
}

export const removeDirent = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.removeDirent')
}

export const expandRecursively = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.expandRecursively')
}

export const newFile = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.newFile')
}

export const newFolder = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.newFolder')
}

export const copyPath = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Explorer.copyPath')
}

export const copyRelativePath = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Explorer.copyRelativePath')
}

export const handleClick = async (index: number): Promise<void> => {
  await RendererWorker.invoke('Explorer.handleClick', index)
}

export const handleClickAt = async (
  preventDefault: boolean,
  button: number,
  ctrlKey: boolean,
  shiftKey: boolean,
  x: number,
  y: number,
): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Explorer.handleClickAt', preventDefault, button, ctrlKey, shiftKey, x, y)
}

export const handleDrop = async (x: number, y: number, fileIds: readonly number[], fileList: FileList | readonly File[]): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Explorer.handleDrop', x, y, fileIds, fileIds)
}

export const rename = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.renameDirent')
}

export const selectAll = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.selectAll')
}

export const renameDirent = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.renameDirent')
}

export const cancelEdit = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.cancelEdit')
}

export const acceptEdit = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.acceptEdit')
}

export const updateEditingValue = async (value: string): Promise<void> => {
  await RendererWorker.invoke('Explorer.updateEditingValue', value)
}

export const expandAll = async (): Promise<void> => {
  await RendererWorker.invoke('Explorer.expandAll')
}

export const handleDragOver = async (x: number, y: number): Promise<void> => {
  await RendererWorker.invoke('Explorer.handleDragOver', x, y)
}

export const handleCut = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Explorer.handleCut')
}

export const handleCopy = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Explorer.handleCopy')
}

export const handlePaste = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Explorer.handlePaste')
}

export const selectIndices = async (indices: readonly number[]): Promise<void> => {
  await RendererWorker.invoke('Explorer.selectIndices', indices)
}

export const toggleIndividualSelection = async (index: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Explorer.toggleIndividualSelection', index)
}
