import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as InputSource from '../InputSource/InputSource.ts'

export const focusNext = async (): Promise<void> => {
  await RendererWorker.invoke('FindWidget.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await RendererWorker.invoke('FindWidget.focusPrevious')
}

export const close = async (): Promise<void> => {
  await RendererWorker.invoke('FindWidget.close')
}

export const setReplaceValue = async (value: string): Promise<void> => {
  await RendererWorker.invoke('FindWidget.handleReplaceInput', value, InputSource.Script)
}

export const setValue = async (value: string): Promise<void> => {
  await RendererWorker.invoke('FindWidget.handleInput', value, InputSource.Script)
}

export const toggleReplace = async (): Promise<void> => {
  await RendererWorker.invoke('FindWidget.toggleReplace')
}

export const toggleMatchCase = async (): Promise<void> => {
  await RendererWorker.invoke('FindWidget.toggleMatchCase')
}

export const toggleMatchWholeWord = async (): Promise<void> => {
  await RendererWorker.invoke('FindWidget.toggleMatchWholeWord')
}

export const togglePreserveCase = async (): Promise<void> => {
  await RendererWorker.invoke('FindWidget.togglePreserveCase')
}

export const toggleUseRegularExpression = async (): Promise<void> => {
  await RendererWorker.invoke('FindWidget.toggleUseRegularExpression')
}

export const replace = async (): Promise<void> => {
  await RendererWorker.invoke('FindWidget.replace')
}

export const replaceAll = async (): Promise<void> => {
  await RendererWorker.invoke('FindWidget.replaceAll')
}

export const focusElement = async (whenExpression: number): Promise<void> => {
  await RendererWorker.invoke('FindWidget.focusElement', whenExpression)
}

export const focusNextElement = async (): Promise<void> => {
  await RendererWorker.invoke('FindWidget.focusNextElement')
}

export const focusPreviousElement = async (): Promise<void> => {
  await RendererWorker.invoke('FindWidget.focusPreviousElement')
}
