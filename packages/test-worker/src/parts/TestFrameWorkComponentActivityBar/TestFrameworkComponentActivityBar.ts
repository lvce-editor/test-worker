import { RendererWorker } from '@lvce-editor/rpc-registry'

export const focus = async (): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.focus')
}

export const toggleActivityBarItem = async (id: string): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.toggleActivityBarItem', id)
}

export const setUserLoginState = async (loginState: string, userInfo?: unknown): Promise<void> => {
  if (userInfo === undefined) {
    await RendererWorker.invoke('ActivityBar.setUserLoginState', loginState)
    return
  }
  await RendererWorker.invoke('ActivityBar.setUserLoginState', loginState, userInfo)
}

export const focusFirst = async (): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.focusFirst')
}

export const setAccountEnabled = async (enabled: boolean): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.setAccountEnabled', enabled)
}

export const focusLast = async (): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.focusLast')
}

export const focusNext = async (): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.focusPrevious')
}

export const handleClick = async (index: number): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.handleClick', index)
}

export const handleSideBarHidden = async (): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.handleSideBarHidden')
}

export const handleContextMenu = async (uid: number, button: number, x: number, y: number): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.handleContextMenu', uid, button, x, y)
}

export const handleExtensionsChanged = async (): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.handleExtensionsChanged')
}

export interface UpdateConfig {
  readonly progress: number
  readonly state: number
}

export const setUpdateState = async (config: UpdateConfig): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.handleUpdateStateChange', config)
}

export const selectCurrent = async (): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.selectCurrent')
}

export const handleClickSettings = async (x: number, y: number): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.handleClickSettings', x, y)
}

export const handleClickAccount = async (x: number, y: number): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.handleClickAccount', x, y)
}

export interface Dimensions {
  readonly height: number
  readonly width: number
  readonly x: number
  readonly y: number
}

export const resize = async (dimensions: Dimensions): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.resize', dimensions)
}
