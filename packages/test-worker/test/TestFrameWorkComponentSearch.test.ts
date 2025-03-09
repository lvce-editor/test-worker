import { test, expect, beforeEach, jest } from '@jest/globals'
import * as Search from '../src/parts/TestFrameWorkComponentSearch/TestFrameWorkComponentSearch.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

beforeEach(() => {
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)
  mockRpc.invoke.mockReset()
})

test('setValue', async () => {
  await Search.setValue('test')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.handleInput', 'test', InputSource.Script)
})

test('setReplaceValue', async () => {
  await Search.setReplaceValue('replace')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.handleReplaceInput', 'replace', InputSource.Script)
})

test('setExcludeValue', async () => {
  await Search.setExcludeValue('exclude')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.handleExcludeInput', 'exclude', InputSource.Script)
})

test('replaceAll', async () => {
  await Search.replaceAll()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.replaceAll')
})

test('setIncludeValue', async () => {
  await Search.setIncludeValue('include')
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.handleIncludeInput', 'include', InputSource.Script)
})

test('clearSearchResults', async () => {
  await Search.clearSearchResults()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.clearSearchResults')
})

test('openDetails', async () => {
  await Search.openDetails()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.openDetails')
})

test('collapseDetails', async () => {
  await Search.collapseDetails()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.collapseDetails')
})

test('dismissItem', async () => {
  await Search.dismissItem()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.dismissItem')
})

test('focusFirst', async () => {
  await Search.focusFirst()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.focusFirst')
})

test('focusIndex', async () => {
  await Search.focusIndex(1)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.focusIndex', 1)
})

test('selectIndex', async () => {
  await Search.selectIndex(1)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.selectIndex', 1)
})

test('focusNext', async () => {
  await Search.focusNext()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.focusNext')
})

test('handleWheel', async () => {
  await Search.handleWheel(0, 100)
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.handleWheel', 0, 100)
})

test('focusNextPage', async () => {
  await Search.focusNextPage()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.focusPage')
})

test('focusPreviousPage', async () => {
  await Search.focusPreviousPage()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.focusPreviousPage')
})

test('focusPrevious', async () => {
  await Search.focusPrevious()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.focusPrevious')
})

test('toggleSearchDetails', async () => {
  await Search.toggleSearchDetails()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.toggleSearchDetails')
})

test('toggleMatchCase', async () => {
  await Search.toggleMatchCase()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.toggleMatchCase')
})

test('toggleMatchWholeWord', async () => {
  await Search.toggleMatchWholeWord()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.toggleMatchWholeWord')
})

test('togglePreserveCase', async () => {
  await Search.togglePreserveCase()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.togglePreserveCase')
})

test('toggleUseRegularExpression', async () => {
  await Search.toggleUseRegularExpression()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.toggleUseRegularExpression')
})

test('toggleReplace', async () => {
  await Search.toggleReplace()
  expect(mockRpc.invoke).toHaveBeenCalledTimes(1)
  expect(mockRpc.invoke).toHaveBeenCalledWith('Search.toggleReplace')
})
