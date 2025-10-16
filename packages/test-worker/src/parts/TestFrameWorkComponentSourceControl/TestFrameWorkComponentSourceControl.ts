import { InputSource } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'

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

export const show = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('SideBar.open', 'Source Control')
}
