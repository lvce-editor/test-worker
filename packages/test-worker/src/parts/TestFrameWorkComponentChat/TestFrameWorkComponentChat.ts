import { RendererWorker } from '@lvce-editor/rpc-registry'

export const handleClickBack = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleClickBack')
}

export const handleClickSettings = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleClickSettings')
}

export const handleClickClose = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleClickClose')
}

export const handleClickNew = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleClickNew')
}

export const show = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.showSecondarySideBar')
  await RendererWorker.invoke('Chat.reset')
}

export const handleInput = async (text: string): Promise<void> => {
  await RendererWorker.invoke('Chat.handleInput', 'composer', text, 'script')
}

export const handleSubmit = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleSubmit')
}
