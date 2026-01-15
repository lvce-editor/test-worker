import { RendererWorker } from '@lvce-editor/rpc-registry'

export const closeMenu = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBar.closeMenu')
}

export const focus = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBar.focus')
}

export const focusFirst = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBar.focusFirst')
}

export const focusIndex = async (index: number): Promise<void> => {
  await RendererWorker.invoke('TitleBar.focusIndex', index)
}

export const focusLast = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBar.focusLast')
}

export const focusNext = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBar.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBar.focusPrevious')
}

export const handleKeyArrowDown = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBar.handleKeyArrowDown')
}

export const handleKeyArrowLeft = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBar.handleKeyArrowLeft')
}

export const handleKeyArrowRight = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBar.handleKeyArrowRight')
}

export const handleKeyArrowUp = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBar.handleKeyArrowUp')
}

export const handleKeyEnd = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBar.handleKeyEnd')
}

export const handleKeyHome = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBar.handleKeyHome')
}

export const handleKeySpace = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBar.handleKeySpace')
}

export const handleKeyEscape = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBar.handleKeyEscape')
}

export const toggleIndex = async (index: number): Promise<void> => {
  await RendererWorker.invoke('TitleBar.toggleIndex', index)
}

export const toggleMenu = async (): Promise<void> => {
  await RendererWorker.invoke('TitleBar.toggleMenu')
}

export const handleContextMenu = async (button: number, x: number, y: number): Promise<void> => {
  await RendererWorker.invoke('TitleBar.handleContextMenu', button, x, y)
}
