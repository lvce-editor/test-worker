import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const closeMenu = async (): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.closeMenu')
}

export const focus = async (): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.focus')
}

export const focusFirst = async (): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.focusFirst')
}

export const focusIndex = async (index: number): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.focusIndex', index)
}

export const focusLast = async (): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.focusLast')
}

export const focusNext = async (): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.focusPrevious')
}

export const handleKeyArrowDown = async (): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.handleKeyArrowDown')
}

export const handleKeyArrowLeft = async (): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.handleKeyArrowLeft')
}

export const handleKeyArrowRight = async (): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.handleKeyArrowRight')
}

export const handleKeyArrowUp = async (): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.handleKeyArrowUp')
}

export const handleKeyEnd = async (): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.handleKeyEnd')
}

export const handleKeyHome = async (): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.handleKeyHome')
}

export const handleKeySpace = async (): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.handleKeySpace')
}

export const handleKeyEscape = async (): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.handleKeyEscape')
}

export const toggleIndex = async (index: number): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.toggleIndex', index)
}

export const toggleMenu = async (): Promise<void> => {
  await Rpc.invoke('TitleBarMenuBar.toggleMenu')
}
