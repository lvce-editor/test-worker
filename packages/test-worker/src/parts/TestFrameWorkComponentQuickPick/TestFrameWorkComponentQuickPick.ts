import { RendererWorker } from '@lvce-editor/rpc-registry'
import { registerCallbackCommand } from '../Callback/Callback.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const open = async (): Promise<void> => {
  await RendererWorker.invoke('Viewlet.openWidget', ViewletModuleId.QuickPick, 'everything')
}

export const handleInput = async (value: string): Promise<void> => {
  await RendererWorker.invoke('QuickPick.handleInput', value, 0)
}

export const handleClickAt = async (x: number, y: number): Promise<void> => {
  await RendererWorker.invoke('QuickPick.handleClickAt', x, y)
}

export const setValue = async (value: string): Promise<void> => {
  await RendererWorker.invoke('QuickPick.setValue', value)
}

export const focusNext = async (): Promise<void> => {
  await RendererWorker.invoke('QuickPick.focusNext')
}

export const focusFirst = async (): Promise<void> => {
  await RendererWorker.invoke('QuickPick.focusFirst')
}

export const focusLast = async (): Promise<void> => {
  await RendererWorker.invoke('QuickPick.focusLast')
}

export const focusIndex = async (index: number): Promise<void> => {
  await RendererWorker.invoke('QuickPick.focusIndex', index)
}

export const focusPrevious = async (): Promise<void> => {
  await RendererWorker.invoke('QuickPick.focusPrevious')
}

export type SelectItemWaitUntil = 'done' | 'quickPick' | 'none'

export interface SelectItemOptions {
  readonly waitUntil?: SelectItemWaitUntil
}

export const selectItem = async (label: string, { waitUntil = 'done' }: SelectItemOptions = {}): Promise<void> => {
  if (waitUntil === 'done') {
    await RendererWorker.invoke('QuickPick.selectItem', label)
    return
  }
  const visiblePromise = waitUntil === 'quickPick' ? RendererWorker.invoke('QuickPick.waitUntilVisible') : undefined
  const promise = Promise.resolve(RendererWorker.invoke('QuickPick.selectItem', label))
  if (waitUntil === 'none') {
    void promise.catch(() => {
      // ignore selection failures when the caller explicitly does not wait
    })
    return
  }
  void promise.catch(() => {
    // ignore selection failures while waiting for the quick pick to remain visible
  })
  await visiblePromise
}

export const selectIndex = async (index: number): Promise<void> => {
  await RendererWorker.invoke('QuickPick.selectIndex', index)
}

export const selectCurrentIndex = async (): Promise<void> => {
  await RendererWorker.invoke('QuickPick.selectCurrentIndex')
}

export const executeCommand = async (label: string): Promise<void> => {
  await RendererWorker.invoke('QuickPick.showCommands')

  await RendererWorker.invoke('QuickPick.handleInput', label, 0)

  await RendererWorker.invoke('QuickPick.selectItem', label)
}

interface SelectItem2Options {
  readonly callbackCommand: string
  readonly label: string
}

export const selectItem2 = async ({ callbackCommand, label }: SelectItem2Options): Promise<void> => {
  const { promise } = await registerCallbackCommand(callbackCommand)

  await Promise.all([promise, RendererWorker.invoke('QuickPick.selectItem', label)])
}
