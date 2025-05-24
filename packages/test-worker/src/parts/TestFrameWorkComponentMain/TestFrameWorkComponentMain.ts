import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const openUri = async (uri: string): Promise<void> => {
  await Rpc.invoke('Main.openUri', uri)
}

export const splitRight = async (): Promise<void> => {
  await Rpc.invoke('Main.splitRight')
}

export const openKeyBindings = async (): Promise<void> => {
  await Rpc.invoke('Main.openKeyBindings')
}

export const closeAllEditors = async (): Promise<void> => {
  await Rpc.invoke('Main.closeAllEditors')
}

export const closeTabsLeft = async (): Promise<void> => {
  await Rpc.invoke('Main.closeTabsLeft')
}

export const closeTabsRight = async (): Promise<void> => {
  await Rpc.invoke('Main.closeTabsRight')
}

export const closeOthers = async (): Promise<void> => {
  await Rpc.invoke('Main.closeOthers')
}

export const closeActiveEditor = async (): Promise<void> => {
  await Rpc.invoke('Main.closeActiveEditor')
}

export const focusFirst = async (): Promise<void> => {
  await Rpc.invoke('Main.focusFirst')
}

export const focusNext = async (): Promise<void> => {
  await Rpc.invoke('Main.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await Rpc.invoke('Main.focusPrevious')
}

export const focusLast = async (): Promise<void> => {
  await Rpc.invoke('Main.focusLast')
}
