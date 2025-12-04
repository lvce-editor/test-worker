import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'keybindings.open'

export const test: Test = async ({ expect, KeyBindingsEditor, Locator }) => {
  // arrange

  // act
  await KeyBindingsEditor.open()

  // assert
  const keyBindingsView = Locator('.Viewlet.KeyBindings')
  await expect(keyBindingsView).toBeVisible()
}
