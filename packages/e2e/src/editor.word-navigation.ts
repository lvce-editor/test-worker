import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.word-navigation'

export const test: Test = async ({ Editor, FileSystem, Main, Workspace }) => {
  // arrange
  const fixtureUrl = import.meta.resolve('../fixtures/workspace.basic')
  const workspaceUrl = await FileSystem.loadFixture(fixtureUrl)
  await Workspace.setPath(workspaceUrl)
  await Main.closeAllEditors()
  await Main.openUri(`${workspaceUrl}/alpha.txt`)
  await Editor.setCursor(0, 11)

  // act
  await Editor.cursorWordLeft()

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([0, 6, 0, 6]))

  // act
  await Editor.cursorWordRight()

  // assert
  await Editor.shouldHaveSelections(new Uint32Array([0, 11, 0, 11]))
}
