import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import { open } from '../TestFrameWorkComponentPanel/TestFrameWorkComponentPanel.ts'

export const show = async (): Promise<void> => {
  await open('Output')
  await DirectViewWorker.invoke('Panel', 'Panel.selectIndex', 1)
}

export const handleFilterInput = async (text: string): Promise<void> => {
  await DirectViewWorker.invoke('Output', 'Output.handleFilterInput', text, InputSource.Script)
}

export const selectChannel = async (channelId: string): Promise<void> => {
  await DirectViewWorker.invoke('Output', 'Output.selectChannel', channelId)
}

export const clear = async (): Promise<void> => {
  await DirectViewWorker.invoke('Output', 'Output.clear')
}

export const saveAs = async (): Promise<void> => {
  await DirectViewWorker.invoke('Output', 'Output.saveAs')
}
