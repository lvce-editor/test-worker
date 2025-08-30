import { beforeEach, expect, jest, test } from '@jest/globals'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as Search from '../src/parts/TestFrameWorkComponentSearch/TestFrameWorkComponentSearch.ts'

const mockInvoke = jest.fn()

const mockRpc = {
  invoke: mockInvoke,
} as any

beforeEach(() => {
  ParentRpc.set(mockRpc)
  mockInvoke.mockReset()
})

test('setValue', async () => {
  await Search.setValue('test')
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.handleInput', 'test', InputSource.Script)
})

test('setReplaceValue', async () => {
  await Search.setReplaceValue('replace')
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.handleReplaceInput', 'replace', InputSource.Script)
})

test('setExcludeValue', async () => {
  await Search.setExcludeValue('exclude')
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.handleExcludeInput', 'exclude', InputSource.Script)
})

test('replaceAll', async () => {
  await Search.replaceAll()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.replaceAll')
})

test('setIncludeValue', async () => {
  await Search.setIncludeValue('include')
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.handleIncludeInput', 'include', InputSource.Script)
})

test('clearSearchResults', async () => {
  await Search.clearSearchResults()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.clearSearchResults')
})

test('openDetails', async () => {
  await Search.openDetails()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.openDetails')
})

test('collapseDetails', async () => {
  await Search.collapseDetails()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.collapseDetails')
})

test('dismissItem', async () => {
  await Search.dismissItem()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.dismissItem')
})

test('focusFirst', async () => {
  await Search.focusFirst()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.focusFirst')
})

test('focusIndex', async () => {
  await Search.focusIndex(1)
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.focusIndex', 1)
})

test('selectIndex', async () => {
  await Search.selectIndex(1)
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.selectIndex', 1)
})

test('focusNext', async () => {
  await Search.focusNext()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.focusNext')
})

test('handleWheel', async () => {
  await Search.handleWheel(0, 100)
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.handleWheel', 0, 100)
})

test('focusNextPage', async () => {
  await Search.focusNextPage()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.focusPage')
})

test('focusPreviousPage', async () => {
  await Search.focusPreviousPage()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.focusPreviousPage')
})

test('focusPrevious', async () => {
  await Search.focusPrevious()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.focusPrevious')
})

test('toggleSearchDetails', async () => {
  await Search.toggleSearchDetails()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.toggleSearchDetails')
})

test('toggleMatchCase', async () => {
  await Search.toggleMatchCase()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.toggleMatchCase')
})

test('toggleMatchWholeWord', async () => {
  await Search.toggleMatchWholeWord()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.toggleMatchWholeWord')
})

test('togglePreserveCase', async () => {
  await Search.togglePreserveCase()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.togglePreserveCase')
})

test('toggleUseRegularExpression', async () => {
  await Search.toggleUseRegularExpression()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.toggleUseRegularExpression')
})

test('toggleReplace', async () => {
  await Search.toggleReplace()
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Search.toggleReplace')
})
