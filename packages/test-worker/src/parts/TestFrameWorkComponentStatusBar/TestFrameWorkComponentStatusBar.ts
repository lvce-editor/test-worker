import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'

export const update = async (): Promise<void> => {
  await DirectViewWorker.invoke('StatusBar', 'StatusBar.updateStatusBarItems')
}

export const handleContextMenu = async (button: number, x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('StatusBar', 'StatusBar.handleContextMenu', button, x, y)
}

export const handleClick = async (name: string): Promise<void> => {
  await DirectViewWorker.invoke('StatusBar', 'StatusBar.handleClick', name)
}

export const handleExtensionsChanged = async (): Promise<void> => {
  await DirectViewWorker.invoke('StatusBar', 'StatusBar.handleExtensionsChanged')
}

export const itemRightCreate = async (item: unknown): Promise<void> => {
  await DirectViewWorker.invoke('StatusBar', 'StatusBar.itemRightCreate', item)
}

export const itemRightUpdate = async (item: unknown): Promise<void> => {
  await DirectViewWorker.invoke('StatusBar', 'StatusBar.itemRightUpdate', item)
}
