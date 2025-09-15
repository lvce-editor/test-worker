import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as Search from '../src/parts/TestFrameWorkComponentSearch/TestFrameWorkComponentSearch.ts'

test('setValue', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.handleInput'() {
      return undefined
    },
  })

  await Search.setValue('test')
  expect(mockRpc.invocations).toEqual([['Search.handleInput', 'test', InputSource.Script]])
})

test('setReplaceValue', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.handleReplaceInput'() {
      return undefined
    },
  })

  await Search.setReplaceValue('replace')
  expect(mockRpc.invocations).toEqual([['Search.handleReplaceInput', 'replace', InputSource.Script]])
})

test('setExcludeValue', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.handleExcludeInput'() {
      return undefined
    },
  })

  await Search.setExcludeValue('exclude')
  expect(mockRpc.invocations).toEqual([['Search.handleExcludeInput', 'exclude', InputSource.Script]])
})

test('replaceAll', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.replaceAll'() {
      return undefined
    },
  })

  await Search.replaceAll()
  expect(mockRpc.invocations).toEqual([['Search.replaceAll']])
})

test('setIncludeValue', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.handleIncludeInput'() {
      return undefined
    },
  })

  await Search.setIncludeValue('include')
  expect(mockRpc.invocations).toEqual([['Search.handleIncludeInput', 'include', InputSource.Script]])
})

test('clearSearchResults', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.clearSearchResults'() {
      return undefined
    },
  })

  await Search.clearSearchResults()
  expect(mockRpc.invocations).toEqual([['Search.clearSearchResults']])
})

test('openDetails', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.openDetails'() {
      return undefined
    },
  })

  await Search.openDetails()
  expect(mockRpc.invocations).toEqual([['Search.openDetails']])
})

test('collapseDetails', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.collapseDetails'() {
      return undefined
    },
  })

  await Search.collapseDetails()
  expect(mockRpc.invocations).toEqual([['Search.collapseDetails']])
})

test('dismissItem', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.dismissItem'() {
      return undefined
    },
  })

  await Search.dismissItem()
  expect(mockRpc.invocations).toEqual([['Search.dismissItem']])
})

test('focusFirst', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.focusFirst'() {
      return undefined
    },
  })

  await Search.focusFirst()
  expect(mockRpc.invocations).toEqual([['Search.focusFirst']])
})

test('focusIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.focusIndex'() {
      return undefined
    },
  })

  await Search.focusIndex(1)
  expect(mockRpc.invocations).toEqual([['Search.focusIndex', 1]])
})

test('selectIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.selectIndex'() {
      return undefined
    },
  })

  await Search.selectIndex(1)
  expect(mockRpc.invocations).toEqual([['Search.selectIndex', 1]])
})

test('focusNext', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.focusNext'() {
      return undefined
    },
  })

  await Search.focusNext()
  expect(mockRpc.invocations).toEqual([['Search.focusNext']])
})

test('handleWheel', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.handleWheel'() {
      return undefined
    },
  })

  await Search.handleWheel(0, 100)
  expect(mockRpc.invocations).toEqual([['Search.handleWheel', 0, 100]])
})

test('focusNextPage', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.focusPage'() {
      return undefined
    },
  })

  await Search.focusNextPage()
  expect(mockRpc.invocations).toEqual([['Search.focusPage']])
})

test('focusPreviousPage', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.focusPreviousPage'() {
      return undefined
    },
  })

  await Search.focusPreviousPage()
  expect(mockRpc.invocations).toEqual([['Search.focusPreviousPage']])
})

test('focusPrevious', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.focusPrevious'() {
      return undefined
    },
  })

  await Search.focusPrevious()
  expect(mockRpc.invocations).toEqual([['Search.focusPrevious']])
})

test('toggleSearchDetails', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.toggleSearchDetails'() {
      return undefined
    },
  })

  await Search.toggleSearchDetails()
  expect(mockRpc.invocations).toEqual([['Search.toggleSearchDetails']])
})

test('toggleMatchCase', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.toggleMatchCase'() {
      return undefined
    },
  })

  await Search.toggleMatchCase()
  expect(mockRpc.invocations).toEqual([['Search.toggleMatchCase']])
})

test('toggleMatchWholeWord', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.toggleMatchWholeWord'() {
      return undefined
    },
  })

  await Search.toggleMatchWholeWord()
  expect(mockRpc.invocations).toEqual([['Search.toggleMatchWholeWord']])
})

test('togglePreserveCase', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.togglePreserveCase'() {
      return undefined
    },
  })

  await Search.togglePreserveCase()
  expect(mockRpc.invocations).toEqual([['Search.togglePreserveCase']])
})

test('toggleUseRegularExpression', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.toggleUseRegularExpression'() {
      return undefined
    },
  })

  await Search.toggleUseRegularExpression()
  expect(mockRpc.invocations).toEqual([['Search.toggleUseRegularExpression']])
})

test('toggleReplace', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Search.toggleReplace'() {
      return undefined
    },
  })

  await Search.toggleReplace()
  expect(mockRpc.invocations).toEqual([['Search.toggleReplace']])
})
