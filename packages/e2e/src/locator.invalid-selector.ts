import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'locator.invalid-selector'

export const test: Test = async ({ Locator }) => {
  try {
    Locator(42 as any)
    throw new Error('expected locator to throw')
  } catch (error) {
    if (!(error instanceof TypeError)) {
      throw error
    }
    if (error.message !== 'selector must be of type string') {
      throw new Error(`expected "selector must be of type string" but got "${error.message}"`)
    }
  }
}
