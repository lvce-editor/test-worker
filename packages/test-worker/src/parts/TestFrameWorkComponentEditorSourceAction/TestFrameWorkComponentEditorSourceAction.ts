import * as ActiveEditorWorker from '../ActiveEditorWorker/ActiveEditorWorker.ts'

export const selectIndex = async (index: number): Promise<void> => {
  await ActiveEditorWorker.invoke('EditorSourceAction.selectIndex', index)
}

export const selectCurrentIndex = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('EditorSourceAction.selectCurrentIndex')
}
