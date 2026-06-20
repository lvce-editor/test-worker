import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.delete-character'

export const test: Test = async ({ Editor, FileSystem, Main, Workspace }) => {
  // arrange
  const fixtureUrl = import.meta.resolve('../fixtures/workspace.basic')
  const workspaceUrl = await FileSystem.loadFixture(fixtureUrl)
  await Workspace.setPath(workspaceUrl)
  const fileUri = `${workspaceUrl}/alpha.txt`
  await Main.openUri(fileUri)

  // act
  await Editor.setCursor(0, 11)
  await Editor.deleteCharacterLeft()

  // assert
  await Editor.shouldHaveText('hello worl\n')
}
