import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as InputSource from '../InputSource/InputSource.ts'

export const handleInput = async (value: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('EditorRename.handleInput', value, InputSource.Script)
}

export const accept = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('EditorRename.accept')
}

export const cancel = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('EditorRename.cancel')
}
