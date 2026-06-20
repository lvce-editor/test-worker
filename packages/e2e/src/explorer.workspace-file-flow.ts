import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'explorer.workspace-file-flow'

export const test: Test = async ({ Editor, Explorer, FileSystem, Workspace }) => {
  // arrange
  const fixtureUrl = import.meta.resolve('../fixtures/workspace.basic')
  const workspaceUrl = await FileSystem.loadFixture(fixtureUrl)
  await Workspace.setPath(workspaceUrl)

  // act
  await Explorer.expandAll()
  await Explorer.focusIndex(7)
  await Explorer.clickCurrent()

  // assert
  await Editor.shouldHaveText('two\n')
}
