import { InputSource } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as SideBar from '../TestFrameWorkComponentSideBar/TestFrameWorkComponentSideBar.ts'

export const open = async (): Promise<void> => {
  await SideBar.open('Extensions')
}

export const handleInput = async (value: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Extensions.handleInput', value, InputSource.Script)
}

export const handleClick = async (index: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Extensions.handleClick', index)
}

export const handleContextMenu = async (button: number, x: number, y: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Extensions.handleContextMenu', button, x, y)
}

export const copyExtensionInfo = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Extensions.copyExtensionInfo')
}

export const copyExtensionId = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Extensions.copyExtensionId')
}

export const clearSearchResults = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Extensions.clearSearchResults')
}
