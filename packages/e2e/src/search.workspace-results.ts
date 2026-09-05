import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.workspace-results'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const workspaceUrl = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: 'test-worker-e2e-search-token\ntest-worker-e2e-search-token\n', uri: `${workspaceUrl}/first.txt` },
    { content: 'green apple\n', uri: `${workspaceUrl}/second.txt` },
  ])
  await Workspace.setPath(workspaceUrl)
  await SideBar.open('Search')

  // act
  await Search.setValue('test-worker-e2e-search-token')

  // assert
  const searchView = Locator('.Search')
  await expect(searchView.locator('[role="status"]')).toHaveText('2 results in 1 file')
}
