import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as InputSource from '../InputSource/InputSource.ts'
import { open } from '../TestFrameWorkComponentPanel/TestFrameWorkComponentPanel.ts'

export const show = async (): Promise<void> => {
  await open('Output')
  // @ts-ignore
  await RendererWorker.invoke('Panel.selectIndex', 1)
}

export const handleFilterInput = async (text: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Output.handleFilterInput', text, InputSource.Script)
}

export const selectChannel = async (channelId: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Output.selectChannel', channelId)
}

export const clear = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Output.clear')
}

export const saveAs = async (): Promise<void> => {
  await RendererWorker.invoke('Output.saveAs')
}
