import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as InputSource from '../InputSource/InputSource.ts'

export const focusNext = async (): Promise<void> => {
  await RendererWorker.invoke('FindWidget.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('FindWidget.focusPrevious')
}

export const setValue = async (value: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('FindWidget.handleInput', value, InputSource.Script)
}
