import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'

export const update = async (): Promise<void> => {
  await DirectViewWorker.invoke('StatusBar', 'StatusBar.updateStatusBarItems')
}

export const handleContextMenu = async (button: number, x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('StatusBar', 'StatusBar.handleContextMenu', button, x, y)
}

export const click = async (name: string): Promise<void> => {
  await DirectViewWorker.invoke('StatusBar', 'StatusBar.handleClick', name)
}
