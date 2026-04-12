import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'locator.invalid-has-text'

export const test: Test = async ({ Locator }) => {
  try {
    Locator('.DialogContent', { hasText: 42 as any })
    throw new Error('expected locator to throw')
  } catch (error) {
    if (!(error instanceof TypeError)) {
      throw error
    }
    if (error.message !== 'options.hasText must be of type string') {
      throw new Error(`expected "options.hasText must be of type string" but got "${error.message}"`)
    }
  }
}
