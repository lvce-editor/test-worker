import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as InputSource from '../InputSource/InputSource.ts'

export const selectIndex = async (index: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Source Control.selectIndex')
}

export const acceptInput = async (): Promise<void> => {
  await RendererWorker.invoke('Source Control.acceptInput')
}

export const handleInput = async (text: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Source Control.handleInput', text, InputSource.Script)
}

export const handleClickSourceControlButtons = async (index: number, name: string): Promise<void> => {
  await RendererWorker.invoke('Source Control.handleClickSourceControlButtons', index, name)
}
