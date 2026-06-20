import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.basic-editing'

export const test: Test = async ({ Editor, FileSystem, Main, Workspace }) => {
  // arrange
  const fixtureUrl = import.meta.resolve('../fixtures/workspace.basic')
  const workspaceUrl = await FileSystem.loadFixture(fixtureUrl)
  await Workspace.setPath(workspaceUrl)
  const fileUri = `${workspaceUrl}/alpha.txt`
  await Main.openUri(fileUri)

  // act
  await Editor.setCursor(0, 5)
  await Editor.type(' brave')

  // assert
  await Editor.shouldHaveText('hello brave world\n')
}
