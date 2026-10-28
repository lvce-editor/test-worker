import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'drag-and-drop.explorer-to-editor'

// The published test-worker API used by test-with-playwright needs a release before this can run.
export const skip = 1

export const test: Test = async ({ DragAndDrop, Editor, expect, Explorer, FileSystem, Locator, Main, Workspace }) => {
  const workspaceUrl = await FileSystem.getTmpDir()
  const uri = `${workspaceUrl}/dragged.txt`
  await FileSystem.setFiles([{ content: 'dragged file content', uri }])
  await Workspace.setUri(workspaceUrl)
  await Main.closeAllEditors()
  const treeItems = Locator('.TreeItem')
  await expect(treeItems).toHaveCount(1)

  // A pointer down above the first row selects its drag data without relying on screen dimensions.
  await Explorer.handlePointerDown(0, 0, 0)
  const dragUri = uri.startsWith('/') ? `file://${uri}` : uri
  await DragAndDrop.shouldHaveDragData([
    { data: dragUri, type: 'text/uri-list' },
    { data: dragUri, type: 'text/plain' },
  ])
  const dropId = await DragAndDrop.createDropSessionFromDragData()
  await Main.handleDrop(dropId)

  const tabs = Locator('.MainTab')
  const draggedTab = Locator('.MainTab[title$="dragged.txt"]')
  await expect(tabs).toHaveCount(1)
  await expect(draggedTab).toBeVisible()
  await Editor.shouldHaveText('dragged file content')
}
