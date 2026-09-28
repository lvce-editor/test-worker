import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'

export interface StatusBarItemElement {
  readonly spinning?: boolean
  readonly type: 'icon' | 'text'
  readonly value: string
}

export interface StatusBarItem {
  readonly ariaLabel: string
  readonly command?: string
  readonly elements: readonly StatusBarItemElement[]
  readonly enabled?: boolean
  readonly extensionId?: string
  readonly isError?: boolean
  readonly name: string
  readonly providerId?: string
  readonly tooltip: string
}

export const createItemRight = async (item: StatusBarItem): Promise<void> => {
  await DirectViewWorker.invoke('StatusBar', 'StatusBar.itemRightCreate', item)
}

export const updateItemRight = async (item: StatusBarItem): Promise<void> => {
  await DirectViewWorker.invoke('StatusBar', 'StatusBar.itemRightUpdate', item)
}

export const update = async (): Promise<void> => {
  await DirectViewWorker.invoke('StatusBar', 'StatusBar.updateStatusBarItems')
}

export const handleContextMenu = async (button: number, x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('StatusBar', 'StatusBar.handleContextMenu', button, x, y)
}

export const click = async (name: string): Promise<void> => {
  await DirectViewWorker.invoke('StatusBar', 'StatusBar.handleClick', name)
}
