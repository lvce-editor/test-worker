import { RendererWorker } from '@lvce-editor/rpc-registry'

export const openUri = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('Main.openUri', uri)
}

export const splitRight = async (): Promise<void> => {
  await RendererWorker.invoke('Main.splitRight')
}

export const openKeyBindings = async (): Promise<void> => {
  await RendererWorker.invoke('Main.openKeyBindings')
}

export const closeAllEditors = async (): Promise<void> => {
  await RendererWorker.invoke('Main.closeAllEditors')
}

export const closeTabsLeft = async (): Promise<void> => {
  await RendererWorker.invoke('Main.closeTabsLeft')
}

export const handleModifiedStatusChange = async (uri: string, newStatus: boolean): Promise<void> => {
  await RendererWorker.invoke('Main.handleModifiedStatusChange', uri, newStatus)
}

export const closeTabsRight = async (): Promise<void> => {
  await RendererWorker.invoke('Main.closeTabsRight')
}

export const selectTab = async (groupIndex: number, tabIndex: number): Promise<void> => {
  await RendererWorker.invoke('Main.selectTab', groupIndex, tabIndex)
}

export const closeOthers = async (): Promise<void> => {
  await RendererWorker.invoke('Main.closeOthers')
}

export const closeActiveEditor = async (): Promise<void> => {
  await RendererWorker.invoke('Main.closeActiveEditor')
}

export const save = async (): Promise<void> => {
  await RendererWorker.invoke('Main.save')
}

export const focusFirst = async (): Promise<void> => {
  await RendererWorker.invoke('Main.focusFirst')
}

export const focusNext = async (): Promise<void> => {
  await RendererWorker.invoke('Main.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await RendererWorker.invoke('Main.focusPrevious')
}

export const focusLast = async (): Promise<void> => {
  await RendererWorker.invoke('Main.focusLast')
}

export const handleTabsContextMenu = async (x: number, y: number): Promise<void> => {
  await RendererWorker.invoke('Main.handleTabsContextMenu', x, y)
}
