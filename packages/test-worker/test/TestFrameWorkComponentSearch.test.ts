import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as Search from '../src/parts/TestFrameWorkComponentSearch/TestFrameWorkComponentSearch.ts'

test('setValue', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.handleInput'() {
      return undefined
    },
  })

  await Search.setValue('test')
  expect(mockRpc.invocations).toEqual([['Search.handleInput', 'test', InputSource.Script]])
})

test('setReplaceValue', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.handleReplaceInput'() {
      return undefined
    },
  })

  await Search.setReplaceValue('replace')
  expect(mockRpc.invocations).toEqual([['Search.handleReplaceInput', 'replace', InputSource.Script]])
})

test('setExcludeValue', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.handleExcludeInput'() {
      return undefined
    },
  })

  await Search.setExcludeValue('exclude')
  expect(mockRpc.invocations).toEqual([['Search.handleExcludeInput', 'exclude', InputSource.Script]])
})

test('replaceAll', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.replaceAll'() {
      return undefined
    },
  })

  await Search.replaceAll()
  expect(mockRpc.invocations).toEqual([['Search.replaceAll']])
})

test('setIncludeValue', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.handleIncludeInput'() {
      return undefined
    },
  })

  await Search.setIncludeValue('include')
  expect(mockRpc.invocations).toEqual([['Search.handleIncludeInput', 'include', InputSource.Script]])
})

test('clearSearchResults', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.clearSearchResults'() {
      return undefined
    },
  })

  await Search.clearSearchResults()
  expect(mockRpc.invocations).toEqual([['Search.clearSearchResults']])
})

test('openDetails', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.openDetails'() {
      return undefined
    },
  })

  await Search.openDetails()
  expect(mockRpc.invocations).toEqual([['Search.openDetails']])
})

test('collapseDetails', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.collapseDetails'() {
      return undefined
    },
  })

  await Search.collapseDetails()
  expect(mockRpc.invocations).toEqual([['Search.collapseDetails']])
})

test('dismissItem', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.dismissItem'() {
      return undefined
    },
  })

  await Search.dismissItem()
  expect(mockRpc.invocations).toEqual([['Search.dismissItem']])
})

test('focusFirst', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.focusFirst'() {
      return undefined
    },
  })

  await Search.focusFirst()
  expect(mockRpc.invocations).toEqual([['Search.focusFirst']])
})

test('focusIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.focusIndex'() {
      return undefined
    },
  })

  await Search.focusIndex(1)
  expect(mockRpc.invocations).toEqual([['Search.focusIndex', 1]])
})

test('selectIndex', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.selectIndex'() {
      return undefined
    },
  })

  await Search.selectIndex(1)
  expect(mockRpc.invocations).toEqual([['Search.selectIndex', 1]])
})

test('focusNext', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.focusNext'() {
      return undefined
    },
  })

  await Search.focusNext()
  expect(mockRpc.invocations).toEqual([['Search.focusNext']])
})

test('handleWheel', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.handleWheel'() {
      return undefined
    },
  })

  await Search.handleWheel(0, 100)
  expect(mockRpc.invocations).toEqual([['Search.handleWheel', 0, 100]])
})

test('focusNextPage', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.focusPage'() {
      return undefined
    },
  })

  await Search.focusNextPage()
  expect(mockRpc.invocations).toEqual([['Search.focusPage']])
})

test('focusPreviousPage', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.focusPreviousPage'() {
      return undefined
    },
  })

  await Search.focusPreviousPage()
  expect(mockRpc.invocations).toEqual([['Search.focusPreviousPage']])
})

test('focusPrevious', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.focusPrevious'() {
      return undefined
    },
  })

  await Search.focusPrevious()
  expect(mockRpc.invocations).toEqual([['Search.focusPrevious']])
})

test('toggleSearchDetails', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.toggleSearchDetails'() {
      return undefined
    },
  })

  await Search.toggleSearchDetails()
  expect(mockRpc.invocations).toEqual([['Search.toggleSearchDetails']])
})

test('toggleMatchCase', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.toggleMatchCase'() {
      return undefined
    },
  })

  await Search.toggleMatchCase()
  expect(mockRpc.invocations).toEqual([['Search.toggleMatchCase']])
})

test('toggleMatchWholeWord', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.toggleMatchWholeWord'() {
      return undefined
    },
  })

  await Search.toggleMatchWholeWord()
  expect(mockRpc.invocations).toEqual([['Search.toggleMatchWholeWord']])
})

test('togglePreserveCase', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.togglePreserveCase'() {
      return undefined
    },
  })

  await Search.togglePreserveCase()
  expect(mockRpc.invocations).toEqual([['Search.togglePreserveCase']])
})

test('toggleUseRegularExpression', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.toggleUseRegularExpression'() {
      return undefined
    },
  })

  await Search.toggleUseRegularExpression()
  expect(mockRpc.invocations).toEqual([['Search.toggleUseRegularExpression']])
})

test('toggleReplace', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.toggleReplace'() {
      return undefined
    },
  })

  await Search.toggleReplace()
  expect(mockRpc.invocations).toEqual([['Search.toggleReplace']])
})

test('open', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.openViewlet'() {
      return undefined
    },
  })

  await Search.open()
  expect(mockRpc.invocations).toEqual([['SideBar.openViewlet', 'Search']])
})

test('setLimit', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.setLimit'() {
      return undefined
    },
  })

  await Search.setLimit(100)
  expect(mockRpc.invocations).toEqual([['Search.setLimit', 100]])
})

test('handleListBlur', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.handleListBlur'() {
      return undefined
    },
  })

  await Search.handleListBlur()
  expect(mockRpc.invocations).toEqual([['Search.handleListBlur']])
})

test('collapseAll', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.collapseAll'() {
      return undefined
    },
  })

  await Search.collapseAll()
  expect(mockRpc.invocations).toEqual([['Search.collapseAll']])
})

test('copy', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.copy'() {
      return undefined
    },
  })

  await Search.copy()
  expect(mockRpc.invocations).toEqual([['Search.copy']])
})

test('copyPath', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.copyPath'() {
      return undefined
    },
  })

  await Search.copyPath()
  expect(mockRpc.invocations).toEqual([['Search.copyPath']])
})

test('handleInputCut', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.handleInputCut'() {
      return undefined
    },
  })

  await Search.handleInputCut('SearchValue')
  expect(mockRpc.invocations).toEqual([['Search.handleInputCut', 'SearchValue']])
})

test('handleInputPaste', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.handleInputPaste'() {
      return undefined
    },
  })

  await Search.handleInputPaste('SearchValue')
  expect(mockRpc.invocations).toEqual([['Search.handleInputPaste', 'SearchValue']])
})

test('handleInputCopy', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.handleInputCopy'() {
      return undefined
    },
  })

  await Search.handleInputCopy('SearchValue')
  expect(mockRpc.invocations).toEqual([['Search.handleInputCopy', 'SearchValue']])
})

test('handleInputSelectionChange', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.handleInputSelectionChange'() {
      return undefined
    },
  })

  await Search.handleInputSelectionChange('SearchValue', 10, 20)
  expect(mockRpc.invocations).toEqual([['Search.handleInputSelectionChange', 'SearchValue', 10, 20]])
})

test('handleInputContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.handleInputConextMenu'() {
      return undefined
    },
  })

  await Search.handleInputContextMenu('SearchValue', 2, 100, 200)
  expect(mockRpc.invocations).toEqual([['Search.handleInputConextMenu', 'SearchValue', 2, 100, 200]])
})

test('handleContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.handleContextMenu'() {
      return undefined
    },
  })

  await Search.handleContextMenu(2, 150, 250)
  expect(mockRpc.invocations).toEqual([['Search.handleContextMenu', 2, 150, 250]])
})

test('enableRenderFolderPaths', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.enableRenderFolderPaths'() {
      return undefined
    },
  })

  await Search.enableRenderFolderPaths()
  expect(mockRpc.invocations).toEqual([['Search.enableRenderFolderPaths']])
})

test('disableRenderFolderPaths', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Search.disableRenderFolderPaths'() {
      return undefined
    },
  })

  await Search.disableRenderFolderPaths()
  expect(mockRpc.invocations).toEqual([['Search.disableRenderFolderPaths']])
})
