import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const openContextMenu = async (index: number): Promise<void> => {
  await Rpc.invoke('Explorer.handleContextMenuKeyboard', index)
}

export const focus = async (): Promise<void> => {
  await Rpc.invoke('Explorer.focusIndex', -1)
}

export const focusNext = async (): Promise<void> => {
  await Rpc.invoke('Explorer.focusNext')
}

export const focusIndex = async (index: number): Promise<void> => {
  await Rpc.invoke('Explorer.focusIndex', index)
}

export const clickCurrent = async (): Promise<void> => {
  await Rpc.invoke('Explorer.handleClickCurrent')
}

export const handleArrowLeft = async (): Promise<void> => {
  await Rpc.invoke('Explorer.handleArrowLeft')
}

export const focusLast = async (): Promise<void> => {
  await Rpc.invoke('Explorer.focusLast')
}

export const focusFirst = async (): Promise<void> => {
  await Rpc.invoke('Explorer.focusFirst')
}

export const removeDirent = async (): Promise<void> => {
  await Rpc.invoke('Explorer.removeDirent')
}

export const expandRecursively = async (): Promise<void> => {
  await Rpc.invoke('Explorer.expandRecursively')
}

export const newFile = async (): Promise<void> => {
  await Rpc.invoke('Explorer.newFile')
}

export const newFolder = async (): Promise<void> => {
  await Rpc.invoke('Explorer.newFolder')
}

export const handleClick = async (index: number): Promise<void> => {
  await Rpc.invoke('Explorer.handleClick', index)
}
export const handleDrop = async (x: number, y: number, fileIds: readonly number[], fileList: FileList | readonly File[]): Promise<void> => {
  await Rpc.invoke('Explorer.handleDrop', x, y, fileIds, fileIds)
}

export const rename = async (): Promise<void> => {
  await Rpc.invoke('Explorer.rename')
}

export const cancelEdit = async (): Promise<void> => {
  await Rpc.invoke('Explorer.cancelEdit')
}

export const acceptEdit = async (): Promise<void> => {
  await Rpc.invoke('Explorer.acceptEdit')
}

export const updateEditingValue = async (value: string): Promise<void> => {
  await Rpc.invoke('Explorer.updateEditingValue', value)
}

export const expandAll = async (): Promise<void> => {
  await Rpc.invoke('Explorer.expandAll')
}
