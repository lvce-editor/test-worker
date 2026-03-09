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

export const enterNewLine = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.enterNewLine')
}

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

export const reset = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.reset')
}

export const mockOpenApiStreamFinish = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.mockOpenApiStreamFinish')
}

export const mockOpenApiStreamPushChunk = async (chunk: string): Promise<void> => {
  await RendererWorker.invoke('Chat.mockOpenApiStreamPushChunk', chunk)
}

export const handleSubmit = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.handleSubmit')
}

export const setStreamingEnabled = async (enabled: boolean): Promise<void> => {
  await RendererWorker.invoke('Chat.setStreamingEnabled', enabled)
}

export const useMockApi = async (): Promise<void> => {
  await RendererWorker.invoke('Chat.useMockApi', true)
}

export const handleModelChange = async (modelId: string): Promise<void> => {
  await RendererWorker.invoke('Chat.handleModelChange', modelId)
}
