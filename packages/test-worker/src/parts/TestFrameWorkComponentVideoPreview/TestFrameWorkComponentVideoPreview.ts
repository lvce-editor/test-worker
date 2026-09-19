import type { ILocatorExternal } from '../ILocatorExternal/ILocatorExternal.ts'
import { expect } from '../Expect/Expect.ts'

const mediaReadyState = 4
const maxAttempts = 50
const retryDelay = 100

const wait = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => globalThis.setTimeout(resolve, milliseconds))
}

export const waitForMediaPreviewReady = async (media: ILocatorExternal): Promise<void> => {
  let lastError: unknown
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      await expect(media).toHaveJSProperty('readyState', mediaReadyState)
      return
    } catch (error) {
      lastError = error
      await wait(retryDelay)
    }
  }
  throw lastError
}
