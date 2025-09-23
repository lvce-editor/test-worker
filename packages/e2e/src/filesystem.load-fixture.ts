import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'filesystem.load-fixture'

export const test: Test = async ({ Workspace, FileSystem, Main, Editor }) => {
  // arrange
  const fixtureUrl = import.meta.resolve('../fixtures/sample.load-fixture')
  // @ts-ignore
  const workspaceUrl = await FileSystem.loadFixture(fixtureUrl)
  await Workspace.setPath(workspaceUrl)
  const fileUri = `${workspaceUrl}/example-file.txt`

  // act
  await Main.openUri(fileUri)

  // assert
  await Editor.shouldHaveText('test')
}
