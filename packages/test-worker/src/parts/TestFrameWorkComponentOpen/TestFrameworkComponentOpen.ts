import { RendererWorker } from '@lvce-editor/rpc-registry'
import { AssertionError } from '../AssertionError/AssertionError.ts'

export const enableMemoryOpener = async (): Promise<void> => {
  await RendererWorker.invoke('Open.enableMemoryOpener')
}

export const disableMemoryOpener = async (): Promise<void> => {
  await RendererWorker.invoke('Open.disableMemoryOpener')
}

const matchesExpectedText = (actualText: string, expectedText: string | RegExp): boolean => {
  if (typeof expectedText === 'string') {
    return actualText === expectedText
  }
  return expectedText.test(actualText)
}

export const shouldHaveUrl = async (expectedText: string | RegExp): Promise<void> => {
  const actualText = await RendererWorker.invoke('Open.readMemoryUrl')
  if (!matchesExpectedText(actualText, expectedText)) {
    throw new AssertionError(`expected opened url to be "${expectedText}" but was "${actualText}"`)
  }
}
