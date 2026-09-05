import * as ActiveEditorWorker from '../ActiveEditorWorker/ActiveEditorWorker.ts'

export const selectIndex = async (index: number): Promise<void> => {
  await ActiveEditorWorker.invoke('EditorCompletion.selectIndex', index)
}

export const selectCurrentIndex = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('EditorCompletion.selectCurrentIndex')
}

export const close = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('EditorCompletion.close')
}

export const handleWheel = async (deltaMode: number, deltaY: number): Promise<void> => {
  await ActiveEditorWorker.invoke('EditorCompletion.handleWheel', deltaMode, deltaY)
}

export const handlePointerdown = async (clientX: number, clientY: number): Promise<void> => {
  await ActiveEditorWorker.invoke('EditorCompletion.handlePointerdown', clientX, clientY)
}
