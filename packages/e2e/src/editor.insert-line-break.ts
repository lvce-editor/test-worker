import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.insert-line-break'

export const test: Test = async ({ Editor, FileSystem, Main, Workspace }) => {
  // arrange
  const fixtureUrl = import.meta.resolve('../fixtures/workspace.basic')
  const workspaceUrl = await FileSystem.loadFixture(fixtureUrl)
  await Workspace.setPath(workspaceUrl)
  await Main.closeAllEditors()
  await Main.openUri(`${workspaceUrl}/alpha.txt`)
  await Editor.setCursor(0, 5)

  // act
  await Editor.insertLineBreak()

  // assert
  await Editor.shouldHaveText('hello\n world\n')
  await Editor.shouldHaveSelections(new Uint32Array([1, 0, 1, 0]))
}
