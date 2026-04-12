import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'locator.invalid-nth'

export const test: Test = async ({ Locator }) => {
  try {
    Locator('.DialogContent', { nth: '1' as any })
    throw new Error('expected locator to throw')
  } catch (error) {
    if (!(error instanceof TypeError)) {
      throw error
    }
    if (error.message !== 'options.nth must be of type number') {
      throw new Error(`expected "options.nth must be of type number" but got "${error.message}"`, { cause: error })
    }
  }
}
