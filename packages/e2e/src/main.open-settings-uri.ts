import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'main.open-settings-uri'

export const test: Test = async ({ expect, Locator, Main }) => {
  // act
  await Main.openUri('settings://')

  // assert
  const settingsView = Locator('.Viewlet.Settings')
  await expect(settingsView).toBeVisible()
}
