import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const readNativeFiles = async (): Promise<void> => {
  await RendererWorker.invoke('ClipBoard.readNativeFiles')
}

export const writeNativeFiles = async (uris: readonly string[]): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('ClipBoard.writeNativeFiles', uris)
}

export const enableMemoryClipBoard = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('ClipBoard.enableMemoryClipBoard')
}

export const disableMemoryClipBoard = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('ClipBoard.disableMemoryClipBoard')
}
