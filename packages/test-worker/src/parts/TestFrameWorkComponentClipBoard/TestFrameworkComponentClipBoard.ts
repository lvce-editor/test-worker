import { RendererWorker } from '@lvce-editor/rpc-registry'
import { AssertionError } from '../AssertionError/AssertionError.ts'

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

const matchesExpectedText = (actualText: string, expectedText: string | RegExp): boolean => {
  if (typeof expectedText === 'string') {
    return actualText === expectedText
  }
  return expectedText.test(actualText)
}

export const shouldHaveText = async (expectedText: string | RegExp): Promise<void> => {
  // @ts-ignore
  const actualText = await RendererWorker.invoke('ClipBoard.readMemoryText')
  if (!matchesExpectedText(actualText, expectedText)) {
    throw new AssertionError(`expected clipboard to have text "${expectedText}" but was "${actualText}"`)
  }
}
