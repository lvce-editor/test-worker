import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'main.close-editors'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  // arrange
  const fixtureUrl = import.meta.resolve('../fixtures/workspace.basic')
  const workspaceUrl = await FileSystem.loadFixture(fixtureUrl)
  await Workspace.setPath(workspaceUrl)
  const oneUri = `${workspaceUrl}/one.txt`
  const twoUri = `${workspaceUrl}/two.txt`
  await Main.openUri(oneUri)
  await Main.openUri(twoUri)

  // assert
  const oneTab = Locator('.TabTitle', { hasText: 'one.txt' })
  const twoTab = Locator('.TabTitle', { hasText: 'two.txt' })
  await expect(oneTab).toBeVisible()
  await expect(twoTab).toBeVisible()

  // act
  await Main.closeActiveEditor()

  // assert
  await expect(oneTab).toBeVisible()
  await expect(twoTab).toBeHidden()

  // act
  await Main.closeAllEditors()

  // assert
  await expect(oneTab).toBeHidden()
  await expect(twoTab).toBeHidden()
}
