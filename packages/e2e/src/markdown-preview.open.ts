import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'markdown-preview.open'

export const test: Test = async ({ FileSystem, MarkdownPreview, Workspace }) => {
  // arrange
  const fixtureUrl = import.meta.resolve('../fixtures/markdown-preview.open')
  const workspaceUrl = await FileSystem.loadFixture(fixtureUrl)
  await Workspace.setUri(workspaceUrl)
  const markdownUri = `${workspaceUrl}/README.md`

  // act
  await MarkdownPreview.open(markdownUri)
}
