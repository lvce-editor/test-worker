import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'about.open'

export const test: Test = async ({ Locator, expect, About }) => {
  // act
  await About.show()

  // assert
  const dialogContent = Locator('.DialogContent')
  await expect(dialogContent).toBeVisible()
  const infoIcon = dialogContent.locator('.DialogInfoIcon')
  await expect(infoIcon).toBeVisible()
}
