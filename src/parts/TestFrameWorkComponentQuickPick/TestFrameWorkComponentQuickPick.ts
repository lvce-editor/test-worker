import * as Rpc from '../ParentRpc/ParentRpc.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const open = async (): Promise<void> => {
  await Rpc.invoke('Viewlet.openWidget', ViewletModuleId.QuickPick, 'everything')
}

export const setValue = async (value: string): Promise<void> => {
  await Rpc.invoke('QuickPick.handleInput', value, 0)
}

export const focusNext = async (): Promise<void> => {
  await Rpc.invoke('QuickPick.focusNext')
}

export const focusIndex = async (index: number): Promise<void> => {
  await Rpc.invoke('QuickPick.focusIndex', index)
}

export const focusPrevious = async () => {
  await Rpc.invoke('QuickPick.focusPrevious')
}

export const selectItem = async (label: string) => {
  await Rpc.invoke('QuickPick.selectItem', label)
}

export const executeCommand = async (label: string): Promise<void> => {
  await Rpc.invoke('QuickPick.showCommands')
  await Rpc.invoke('QuickPick.handleInput', label, 0)
  await Rpc.invoke('QuickPick.selectItem', label)
}
