import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'drag-and-drop.uri-list'

export const test: Test = async ({ DragAndDrop, Editor, expect, FileSystem, Locator, Main, Workspace }) => {
  const fixtureUrl = import.meta.resolve('../fixtures/workspace.basic')
  const workspaceUrl = await FileSystem.loadFixture(fixtureUrl)
  await Workspace.setPath(workspaceUrl)
  await Main.closeAllEditors()
  const first = `${workspaceUrl}/left.txt`
  const second = `${workspaceUrl}/right.txt`

  const dropId = await DragAndDrop.createDropSession([
    { kind: 'string', type: 'text/uri-list', value: `# ignored comment\r\n${first}\r\n\r\n${second}\r\n` },
  ])
  await Main.handleDrop(dropId)

  await expect(Locator('.MainTab')).toHaveCount(2)
  await expect(Locator('.MainTab[title$="left.txt"]')).toBeVisible()
  await expect(Locator('.MainTab[title$="right.txt"]')).toBeVisible()
  await Editor.shouldHaveText('right file\n')
}
