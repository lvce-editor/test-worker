import { RendererWorker } from '@lvce-editor/rpc-registry'

export const show = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.showSecondarySideBar')
  await RendererWorker.invoke('Chat.reset')
}

export const getSelectedSessionId = async (): Promise<string> => {
  return RendererWorker.invoke('Chat.getSelectedSessionId')
}

export const handleInput = async (text: string): Promise<void> => {
  await RendererWorker.invoke('Chat.handleInput', 'composer', text, 'script')
}

export const reset = async (text: string): Promise<void> => {
  await RendererWorker.invoke('Chat.reset')
}

export const handleSubmit = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleSubmit')
}
