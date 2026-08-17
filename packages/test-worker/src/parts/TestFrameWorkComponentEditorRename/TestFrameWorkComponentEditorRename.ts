import * as ActiveEditorWorker from '../ActiveEditorWorker/ActiveEditorWorker.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const handleInput = async (value: string): Promise<void> => {
  await ActiveEditorWorker.invoke('EditorRename.handleInput', value, InputSource.Script)
}

export const accept = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('EditorRename.accept')
}

export const cancel = async (): Promise<void> => {
  await ActiveEditorWorker.invoke('EditorRename.cancel')
}
