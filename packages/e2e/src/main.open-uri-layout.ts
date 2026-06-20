import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'main.open-uri-layout'

export const test: Test = async ({ Editor, expect, FileSystem, Locator, Main, Workspace }) => {
  // arrange
  const fixtureUrl = import.meta.resolve('../fixtures/workspace.basic')
  const workspaceUrl = await FileSystem.loadFixture(fixtureUrl)
  await Workspace.setPath(workspaceUrl)
  const leftUri = `${workspaceUrl}/left.txt`
  const rightUri = `${workspaceUrl}/right.txt`
  await Main.openUri(leftUri)

  // act
  await Main.splitRight()
  await Main.openUri(rightUri)

  // assert
  const leftTab = Locator('.TabTitle', { hasText: 'left.txt' })
  const rightTab = Locator('.TabTitle', { hasText: 'right.txt' })
  await expect(leftTab).toBeVisible()
  await expect(rightTab).toBeVisible()
  await Editor.shouldHaveText('right file\n')
}
