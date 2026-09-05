import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'filesystem.write-file'

export const test: Test = async ({ Editor, FileSystem, Main, Workspace }) => {
  // arrange
  const workspaceUrl = await FileSystem.getTmpDir()
  const fileUri = `${workspaceUrl}/written-by-test-worker.txt`

  // act
  await FileSystem.writeFile(fileUri, 'written through the e2e API\n')

  // assert
  await FileSystem.shouldHaveFile(fileUri, 'written through the e2e API\n')

  // act
  await Workspace.setPath(workspaceUrl)
  await Main.closeAllEditors()
  await Main.openUri(fileUri)

  // assert
  await Editor.shouldHaveText('written through the e2e API\n')
}
