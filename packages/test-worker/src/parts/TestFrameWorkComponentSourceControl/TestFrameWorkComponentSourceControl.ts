import { InputSource } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as SideBar from '../TestFrameWorkComponentSideBar/TestFrameWorkComponentSideBar.ts'

export const selectIndex = async (index: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Source Control.selectIndex', index)
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

export const handleContextMenu = async (button: number, x: number, y: number): Promise<void> => {
  await RendererWorker.invoke('Source Control.handleContextMenu', button, x, y)
}

export const show = async (): Promise<void> => {
  // @ts-ignore
  await SideBar.open('Source Control')
}
