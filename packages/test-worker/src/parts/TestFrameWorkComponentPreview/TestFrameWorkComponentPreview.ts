import { RendererWorker } from '@lvce-editor/rpc-registry'

export const open = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('Layout.showPreview', uri)
}

export const handleClick = async (hdId: string): Promise<void> => {
  await RendererWorker.invoke('Preview.handleClick', hdId)
}

export const handleInput = async (hdId: string, value: string): Promise<void> => {
  await RendererWorker.invoke('Preview.handleInput', hdId, value)
}

export const handleKeyDown = async (hdId: string, key: string, code: string): Promise<void> => {
  await RendererWorker.invoke('Preview.handleKeyDown', hdId, key, code)
}

export const setUri = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('Preview.setUri', uri)
}

export const waitForClick = async (): Promise<void> => {
  await RendererWorker.invoke('Preview.waitForClick')
}
