import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'locator.invalid-options'

export const test: Test = async ({ Locator }) => {
  try {
    Locator('.DialogContent', null as any)
    throw new Error('expected locator to throw')
  } catch (error) {
    if (!(error instanceof TypeError)) {
      throw error
    }
    if (error.message !== 'options must be of type object') {
      throw new Error(`expected "options must be of type object" but got "${error.message}"`, { cause: error })
    }
  }
}
