import { RendererWorker } from '@lvce-editor/rpc-registry'

export const focus = async (): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.focus')
}

export const toggleActivityBarItem = async (id: string): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.toggleActivityBarItem', id)
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

export const handleContextMenu = async (): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.handleContextMenu')
}

export interface UpdateConfig {
  readonly progress: number
  readonly state: number
}

export const setUpdateState = async (config: UpdateConfig): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.setUpdateState', config)
}

export const selectCurrent = async (): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.selectCurrent')
}

export const handleClickSettings = async (x: number, y: number): Promise<void> => {
  await RendererWorker.invoke('ActivityBar.handleClickSettings', x, y)
}
