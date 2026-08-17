import * as ActiveEditorWorker from '../ActiveEditorWorker/ActiveEditorWorker.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const focusNext = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('FindWidget.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('FindWidget.focusPrevious')
}

export const close = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('FindWidget.close')
}

export const setReplaceValue = async (value: string): Promise<void> => {
  await ActiveEditorWorker.invoke('FindWidget.handleReplaceInput', value, InputSource.Script)
}

export const setValue = async (value: string): Promise<void> => {
  await ActiveEditorWorker.invoke('FindWidget.handleInput', value, InputSource.Script)
}

export const toggleReplace = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('FindWidget.toggleReplace')
}

export const toggleMatchCase = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('FindWidget.toggleMatchCase')
}

export const toggleMatchWholeWord = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('FindWidget.toggleMatchWholeWord')
}

export const togglePreserveCase = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('FindWidget.togglePreserveCase')
}

export const toggleUseRegularExpression = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('FindWidget.toggleUseRegularExpression')
}

export const replace = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('FindWidget.replace')
}

export const replaceAll = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('FindWidget.replaceAll')
}

export const focusElement = async (whenExpression: number): Promise<void> => {
  await ActiveEditorWorker.invoke('FindWidget.focusElement', whenExpression)
}

export const focusNextElement = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('FindWidget.focusNextElement')
}

export const focusPreviousElement = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('FindWidget.focusPreviousElement')
}
