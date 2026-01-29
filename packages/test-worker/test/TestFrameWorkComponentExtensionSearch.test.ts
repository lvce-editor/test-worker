import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as ExtensionSearch from '../src/parts/TestFrameWorkComponentExtensionSearch/TestFrameWorkComponentExtensionSearch.ts'

test('open opens Extensions sidebar', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.openViewlet'() {
      return undefined
    },
  })
  await ExtensionSearch.open()
  expect(mockRpc.invocations).toEqual([['SideBar.openViewlet', 'Extensions']])
})

test('handleInput with search value', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.handleInput'() {
      return undefined
    },
  })
  await ExtensionSearch.handleInput('test extension')
  expect(mockRpc.invocations).toEqual([['Extensions.handleInput', 'test extension', InputSource.Script]])
})

test('handleInput with empty value', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.handleInput'() {
      return undefined
    },
  })
  await ExtensionSearch.handleInput('')
  expect(mockRpc.invocations).toEqual([['Extensions.handleInput', '', InputSource.Script]])
})

test('handleClick with extension index', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.handleClick'() {
      return undefined
    },
  })
  await ExtensionSearch.handleClick(0)
  expect(mockRpc.invocations).toEqual([['Extensions.handleClick', 0]])
})

test('handleClick with different extension indices', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.handleClick'() {
      return undefined
    },
  })
  await ExtensionSearch.handleClick(1)
  await ExtensionSearch.handleClick(5)
  await ExtensionSearch.handleClick(10)
  expect(mockRpc.invocations).toEqual([
    ['Extensions.handleClick', 1],
    ['Extensions.handleClick', 5],
    ['Extensions.handleClick', 10],
  ])
})

test('handleContextMenu with button and coordinates', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.handleContextMenu'() {
      return undefined
    },
  })
  await ExtensionSearch.handleContextMenu(2, 100, 200)
  expect(mockRpc.invocations).toEqual([['Extensions.handleContextMenu', 2, 100, 200]])
})

test('handleContextMenu with different button numbers', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.handleContextMenu'() {
      return undefined
    },
  })
  await ExtensionSearch.handleContextMenu(0, 50, 75)
  await ExtensionSearch.handleContextMenu(1, 150, 225)
  await ExtensionSearch.handleContextMenu(2, 250, 375)
  expect(mockRpc.invocations).toEqual([
    ['Extensions.handleContextMenu', 0, 50, 75],
    ['Extensions.handleContextMenu', 1, 150, 225],
    ['Extensions.handleContextMenu', 2, 250, 375],
  ])
})

test('handleClickFilter', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.handleClickFilter'() {
      return undefined
    },
  })
  await ExtensionSearch.handleClickFilter()
  expect(mockRpc.invocations).toEqual([['Extensions.handleClickFilter']])
})

test('handleClickFilter can be called multiple times', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.handleClickFilter'() {
      return undefined
    },
  })
  await ExtensionSearch.handleClickFilter()
  await ExtensionSearch.handleClickFilter()
  await ExtensionSearch.handleClickFilter()
  expect(mockRpc.invocations).toEqual([['Extensions.handleClickFilter'], ['Extensions.handleClickFilter'], ['Extensions.handleClickFilter']])
})

test('copyExtensionInfo', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.copyExtensionInfo'() {
      return undefined
    },
  })
  await ExtensionSearch.copyExtensionInfo()
  expect(mockRpc.invocations).toEqual([['Extensions.copyExtensionInfo']])
})

test('copyExtensionId', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.copyExtensionId'() {
      return undefined
    },
  })
  await ExtensionSearch.copyExtensionId()
  expect(mockRpc.invocations).toEqual([['Extensions.copyExtensionId']])
})

test('clearSearchResults', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.clearSearchResults'() {
      return undefined
    },
  })
  await ExtensionSearch.clearSearchResults()
  expect(mockRpc.invocations).toEqual([['Extensions.clearSearchResults']])
})

test('multiple operations in sequence', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.clearSearchResults'() {
      return undefined
    },
    'Extensions.copyExtensionInfo'() {
      return undefined
    },
    'Extensions.handleClick'() {
      return undefined
    },
    'Extensions.handleClickFilter'() {
      return undefined
    },
    'Extensions.handleInput'() {
      return undefined
    },
    'SideBar.openViewlet'() {
      return undefined
    },
  })

  await ExtensionSearch.open()
  await ExtensionSearch.handleInput('search term')
  await ExtensionSearch.handleClickFilter()
  await ExtensionSearch.handleClick(2)
  await ExtensionSearch.copyExtensionInfo()
  await ExtensionSearch.clearSearchResults()

  expect(mockRpc.invocations).toEqual([
    ['SideBar.openViewlet', 'Extensions'],
    ['Extensions.handleInput', 'search term', InputSource.Script],
    ['Extensions.handleClickFilter'],
    ['Extensions.handleClick', 2],
    ['Extensions.copyExtensionInfo'],
    ['Extensions.clearSearchResults'],
  ])
})
