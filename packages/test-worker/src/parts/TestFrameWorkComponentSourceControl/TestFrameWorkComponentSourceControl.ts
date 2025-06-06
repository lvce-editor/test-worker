import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const selectIndex = async (index: number): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Source Control.selectIndex')
}

export const acceptInput = async (): Promise<void> => {
  await Rpc.invoke('Source Control.acceptInput')
}

export const handleInput = async (text: string): Promise<void> => {
  await Rpc.invoke('Source Control.handleInput', text)
}

export const handleClickSourceControlButtons = async (index: number, name: string): Promise<void> => {
  await Rpc.invoke('Source Control.handleClickSourceControlButtons', index, name)
}
