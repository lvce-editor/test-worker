import { RendererWorker } from '@lvce-editor/rpc-registry'

export const closeMenu = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.closeMenu')
}

export const focus = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.focus')
}

export const focusFirst = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.focusFirst')
}

export const focusIndex = async (index: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('TitleBarMenuBar.focusIndex', index)
}

export const focusLast = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.focusLast')
}

export const focusNext = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.focusPrevious')
}

export const handleKeyArrowDown = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.handleKeyArrowDown')
}

export const handleKeyArrowLeft = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.handleKeyArrowLeft')
}

export const handleKeyArrowRight = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.handleKeyArrowRight')
}

export const handleKeyArrowUp = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.handleKeyArrowUp')
}

export const handleKeyEnd = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.handleKeyEnd')
}

export const handleKeyHome = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.handleKeyHome')
}

export const handleKeySpace = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.handleKeySpace')
}

export const handleKeyEscape = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.handleKeyEscape')
}

export const toggleIndex = async (index: number): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.toggleIndex', index)
}

export const toggleMenu = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBarMenuBar.toggleMenu')
}
