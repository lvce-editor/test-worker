import { RendererWorker } from '@lvce-editor/rpc-registry'
import { AssertionError } from '../AssertionError/AssertionError.ts'

export const readNativeFiles = async (): Promise<void> => {
  await RendererWorker.invoke('ClipBoard.readNativeFiles')
}

export const writeNativeFiles = async (uris: readonly string[]): Promise<void> => {
  await RendererWorker.invoke('ClipBoard.writeNativeFiles', uris)
}

export const enableMemoryClipBoard = async (): Promise<void> => {
  await RendererWorker.invoke('ClipBoard.enableMemoryClipBoard')
}

export const disableMemoryClipBoard = async (): Promise<void> => {
  await RendererWorker.invoke('ClipBoard.disableMemoryClipBoard')
}

const matchesExpectedText = (actualText: string, expectedText: string | RegExp): boolean => {
  if (typeof expectedText === 'string') {
    return actualText === expectedText
  }
  return expectedText.test(actualText)
}

export const shouldHaveText = async (expectedText: string | RegExp): Promise<void> => {
  const actualText = await RendererWorker.invoke('ClipBoard.readMemoryText')
  if (!matchesExpectedText(actualText, expectedText)) {
    throw new AssertionError(`expected clipboard to have text "${expectedText}" but was "${actualText}"`)
  }
}

const findFirstDifferentByte = (actual: Uint8Array, expected: Uint8Array): number => {
  const length = Math.min(actual.length, expected.length)
  for (let index = 0; index < length; index++) {
    if (actual[index] !== expected[index]) {
      return index
    }
  }
  return actual.length === expected.length ? -1 : length
}

export const shouldHaveImage = async (expectedUri: string): Promise<void> => {
  const actualImage = await RendererWorker.invoke('ClipBoard.readMemoryImage')
  if (!(actualImage instanceof Blob)) {
    throw new AssertionError(`expected clipboard to have image "${expectedUri}" but it had no image`)
  }
  const expectedImage = await RendererWorker.invoke('FileSystem.getBlob', expectedUri)
  if (!(expectedImage instanceof Blob)) {
    throw new AssertionError(`expected image "${expectedUri}" could not be read`)
  }
  const [actualBuffer, expectedBuffer] = await Promise.all([actualImage.arrayBuffer(), expectedImage.arrayBuffer()])
  const actualBytes = new Uint8Array(actualBuffer)
  const expectedBytes = new Uint8Array(expectedBuffer)
  const firstDifferentByte = findFirstDifferentByte(actualBytes, expectedBytes)
  if (firstDifferentByte !== -1) {
    throw new AssertionError(
      `expected clipboard image to match "${expectedUri}" but contents differed at byte ${firstDifferentByte} (expected ${expectedBytes.length} bytes, got ${actualBytes.length})`,
    )
  }
}

export const writeText = async (text: string): Promise<void> => {
  await RendererWorker.invoke('ClipBoard.writeText', text)
}
