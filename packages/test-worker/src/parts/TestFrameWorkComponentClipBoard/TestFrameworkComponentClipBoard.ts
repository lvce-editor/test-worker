import { AssertionError } from '../AssertionError/AssertionError.ts'
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

export const shouldHaveText = async (expectedText: string): Promise<void> => {
  // @ts-ignore
  const actualText = await RendererWorker.invoke('ClipBoard.readMemoryText')
  if (actualText !== expectedText) {
    throw new AssertionError(`expected clipboard to have text "${expectedText}" but was "${actualText}"`)
  }
}
