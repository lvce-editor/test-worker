import { EditorWorker } from '@lvce-editor/rpc-registry'

export const getEditorKey = async (): Promise<number> => {
  const keys = await EditorWorker.invoke('Editor.getKeys')
  if (keys.length === 0) {
    throw new Error(`no editor found`)
  }
  const key = keys.at(-1)
  const numeric = Number.parseInt(key)
  return numeric
}
