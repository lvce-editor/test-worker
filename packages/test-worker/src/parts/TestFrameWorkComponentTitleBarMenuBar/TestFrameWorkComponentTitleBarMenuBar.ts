import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'

export const closeMenu = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.closeMenu')
}

export const focus = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.focus')
}

export const focusFirst = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.focusFirst')
}

export const setTitleTemplate = async (template: string): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.setTitleTemplate', template)
}

export const setWidth = async (width: number): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.setWidth', width)
}

export const handleWorkspaceChange = async (uri: string): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.handleWorkspaceChange', uri)
}

export const focusIndex = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.focusIndex', index)
}

export const focusLast = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.focusLast')
}

export const focusNext = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.focusPrevious')
}

export const handleKeyArrowDown = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.handleKeyArrowDown')
}

export const handleKeyArrowLeft = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.handleKeyArrowLeft')
}

export const handleKeyArrowRight = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.handleKeyArrowRight')
}

export const handleKeyArrowUp = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.handleKeyArrowUp')
}

export const handleKeyEnter = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.handleKeyEnter')
}

export const handleKeyEnd = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.handleKeyEnd')
}

export const handleKeyHome = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.handleKeyHome')
}

export const handleKeySpace = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.handleKeySpace')
}

export const handleKeyEscape = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.handleKeyEscape')
}

export const toggleIndex = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.toggleIndex', index)
}

export const toggleMenu = async (): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.toggleMenu')
}

export const handleMenuClick = async (menuIndex: number, itemIndex: number): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.handleMenuClick', menuIndex, itemIndex)
}

export const handleClick = async (button: number, menuIndex: number): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.handleClick', button, menuIndex)
}

export const handleMouseOver = async (menuIndex: number): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.handleMouseOver', menuIndex)
}

export const handleContextMenu = async (button: number, x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('TitleBar', 'TitleBar.handleContextMenu', button, x, y)
}
