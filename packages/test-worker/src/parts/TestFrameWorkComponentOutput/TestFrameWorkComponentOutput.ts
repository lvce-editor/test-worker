import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const show = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Panel.selectIndex', 1)
}

export const handleFilterInput = async (text: string): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Output.handleFilterInput', text)
}

export const selectChannel = async (channelId: string): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Output.selectChannel', channelId)
}
