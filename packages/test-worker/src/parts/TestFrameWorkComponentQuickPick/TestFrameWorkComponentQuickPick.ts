import { RendererWorker } from '@lvce-editor/rpc-registry'
import { registerCallbackCommand } from '../Callback/Callback.ts'
import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const open = async (): Promise<void> => {
  await RendererWorker.invoke('Viewlet.openWidget', ViewletModuleId.QuickPick, 'everything')
}

export const handleInput = async (value: string): Promise<void> => {
  await DirectViewWorker.invoke('QuickPick', 'QuickPick.handleInput', value, 0)
}

export const handleClickAt = async (x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('QuickPick', 'QuickPick.handleClickAt', x, y)
}

export const setValue = async (value: string): Promise<void> => {
  await DirectViewWorker.invoke('QuickPick', 'QuickPick.setValue', value)
}

export const focusNext = async (): Promise<void> => {
  await DirectViewWorker.invoke('QuickPick', 'QuickPick.focusNext')
}

export const focusFirst = async (): Promise<void> => {
  await DirectViewWorker.invoke('QuickPick', 'QuickPick.focusFirst')
}

export const focusLast = async (): Promise<void> => {
  await DirectViewWorker.invoke('QuickPick', 'QuickPick.focusLast')
}

export const focusIndex = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('QuickPick', 'QuickPick.focusIndex', index)
}

export const focusPrevious = async (): Promise<void> => {
  await DirectViewWorker.invoke('QuickPick', 'QuickPick.focusPrevious')
}

export interface SelectItemOptions {
  readonly waitUntil?: 'done' | 'quickPick' | 'none'
}

const ignoreSelectionFailure = async (promise: Promise<void>): Promise<void> => {
  try {
    await promise
  } catch {
    // ignore selection failures for fire-and-forget selection flows
  }
}

export const selectItem = async (label: string, { waitUntil = 'done' }: SelectItemOptions = {}): Promise<void> => {
  if (waitUntil === 'done') {
    await DirectViewWorker.invoke('QuickPick', 'QuickPick.selectItem', label)
    return
  }
  const visiblePromise = waitUntil === 'quickPick' ? DirectViewWorker.invoke('QuickPick', 'QuickPick.waitUntilVisible') : undefined
  const promise = Promise.resolve(DirectViewWorker.invoke('QuickPick', 'QuickPick.selectItem', label))
  if (waitUntil === 'none') {
    void ignoreSelectionFailure(promise)
    return
  }
  void ignoreSelectionFailure(promise)
  await visiblePromise
}

export const selectIndex = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('QuickPick', 'QuickPick.selectIndex', index)
}

export const selectCurrentIndex = async (): Promise<void> => {
  await DirectViewWorker.invoke('QuickPick', 'QuickPick.selectCurrentIndex')
}

export const executeCommand = async (label: string): Promise<void> => {
  await DirectViewWorker.invoke('QuickPick', 'QuickPick.showCommands')

  await DirectViewWorker.invoke('QuickPick', 'QuickPick.handleInput', label, 0)

  await DirectViewWorker.invoke('QuickPick', 'QuickPick.selectItem', label)
}

interface SelectItem2Options {
  readonly callbackCommand: string
  readonly label: string
}

export const selectItem2 = async ({ callbackCommand, label }: SelectItem2Options): Promise<void> => {
  const { promise } = await registerCallbackCommand(callbackCommand)

  await Promise.all([promise, DirectViewWorker.invoke('QuickPick', 'QuickPick.selectItem', label)])
}
