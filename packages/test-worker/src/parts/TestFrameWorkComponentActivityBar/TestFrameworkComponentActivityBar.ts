import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'

export const focus = async (): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.focus')
}

export const toggleActivityBarItem = async (id: string): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.toggleActivityBarItem', id)
}

export const setUserLoginState = async (loginState: string, userInfo?: unknown): Promise<void> => {
  if (userInfo === undefined) {
    await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.setUserLoginState', loginState)
    return
  }
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.setUserLoginState', loginState, userInfo)
}

export const focusFirst = async (): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.focusFirst')
}

export const setAccountEnabled = async (enabled: boolean): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.setAccountEnabled', enabled)
}

export const focusLast = async (): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.focusLast')
}

export const focusNext = async (): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.focusPrevious')
}

export const handleClick = async (): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.handleClick', 0, -1000, -1000, '')
}

export const handleClickIndex = async (): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.handleClickIndex', 0, 1, 0, 0)
}

export const handleSideBarHidden = async (): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.handleSideBarHidden')
}

export const handleContextMenu = async (uid: number, button: number, x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.handleContextMenu', uid, button, x, y)
}

export const handleExtensionsChanged = async (): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.handleExtensionsChanged')
}

export const handleBadgeCountChange = async (): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.handleBadgeCountChange', {})
}

export const handleSettingsChanged = async (): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.handleSettingsChanged')
}

export interface UpdateConfig {
  readonly progress: number
  readonly state: number
}

export const setUpdateState = async (config: UpdateConfig): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.handleUpdateStateChange', config)
}

export const selectCurrent = async (): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.selectCurrent')
}

export const handleClickSettings = async (x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.handleClickSettings', x, y)
}

export const handleClickAccount = async (x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.handleClickAccount', x, y)
}

export const handleClickAdditionalViews = async (x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.handleClickAdditionalViews', x, y)
}

export interface Dimensions {
  readonly height: number
  readonly width: number
  readonly x: number
  readonly y: number
}

export const resize = async (dimensions: Dimensions): Promise<void> => {
  await DirectViewWorker.invoke('ActivityBar', 'ActivityBar.resize', dimensions)
}
