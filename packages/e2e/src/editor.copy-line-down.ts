import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.copy-line-down'

export const test: Test = async ({ Editor, FileSystem, Main, Workspace }) => {
  // arrange
  const workspaceUrl = await FileSystem.getTmpDir()
  const fileUri = `${workspaceUrl}/copy-line-down.txt`
  await FileSystem.writeFile(fileUri, 'one\ntwo\n')
  await Workspace.setPath(workspaceUrl)
  await Main.closeAllEditors()
  await Main.openUri(fileUri)
  await Editor.setCursor(0, 1)

  // act
  await Editor.copyLineDown()

  // assert
  await Editor.shouldHaveText('one\none\ntwo\n')
}
