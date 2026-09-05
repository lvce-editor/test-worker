import * as ActiveEditorWorker from '../ActiveEditorWorker/ActiveEditorWorker.ts'

export const setRelativeX = async (x: number): Promise<void> => {
  await ActiveEditorWorker.invoke('ColorPicker.setRelativeX', x)
}
