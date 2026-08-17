import * as ActiveEditorWorker from '../ActiveEditorWorker/ActiveEditorWorker.ts'

export const show = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('Editor.showHover2')
}

export const close = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('EditorHover.close')
}
