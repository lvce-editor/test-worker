import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const focus = async (): Promise<void> => {
  await Rpc.invoke('ActivityBar.focus')
}

export const focusFirst = async (): Promise<void> => {
  await Rpc.invoke('ActivityBar.focusFirst')
}

export const focusLast = async (): Promise<void> => {
  await Rpc.invoke('ActivityBar.focusLast')
}

export const focusNext = async (): Promise<void> => {
  await Rpc.invoke('ActivityBar.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await Rpc.invoke('ActivityBar.focusPrevious')
}

export const handleClick = async (index: number): Promise<void> => {
  await Rpc.invoke('ActivityBar.handleClick', index)
}

export const handleContextMenu = async (): Promise<void> => {
  await Rpc.invoke('ActivityBar.handleContextMenu')
}

export const selectCurrent = async (): Promise<void> => {
  await Rpc.invoke('ActivityBar.selectCurrent')
}
