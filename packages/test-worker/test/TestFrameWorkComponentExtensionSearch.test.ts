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
  expect(mockRpc.invocations).toEqual([['Extensions.handleInput', 'test extension', InputSource.Script, 14]])
})

test('handleInput with empty value', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.handleInput'() {
      return undefined
    },
  })
  await ExtensionSearch.handleInput('')
  expect(mockRpc.invocations).toEqual([['Extensions.handleInput', '', InputSource.Script, 0]])
})

test('handleInput with input source and cursor offset', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.handleInput'() {
      return undefined
    },
  })
  await ExtensionSearch.handleInput('theme @en', 1, 5)
  expect(mockRpc.invocations).toEqual([['Extensions.handleInput', 'theme @en', 1, 5]])
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

test('setExtensionStatus', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.setExtensionStatus'() {
      return undefined
    },
  })

  await ExtensionSearch.setExtensionStatus('test.extension', 'installing')
  await ExtensionSearch.setExtensionStatus('test.extension', 'enabled', false)

  expect(mockRpc.invocations).toEqual([
    ['Extensions.setExtensionStatus', 'test.extension', 'installing'],
    ['Extensions.setExtensionStatus', 'test.extension', 'enabled', false],
  ])
})

test('completion commands', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.acceptCompletion'() {
      return undefined
    },
    'Extensions.closeSuggest'() {
      return undefined
    },
    'Extensions.handleBlur'() {
      return undefined
    },
    'Extensions.handleClickAt'() {
      return undefined
    },
    'Extensions.selectNextCompletion'() {
      return undefined
    },
    'Extensions.selectPreviousCompletion'() {
      return undefined
    },
  })

  await ExtensionSearch.acceptCompletion()
  await ExtensionSearch.closeSuggest()
  await ExtensionSearch.handleBlur()
  await ExtensionSearch.handleClickAt(0, 10, 20, '@builtin')
  await ExtensionSearch.selectNextCompletion()
  await ExtensionSearch.selectPreviousCompletion()

  expect(mockRpc.invocations).toEqual([
    ['Extensions.acceptCompletion'],
    ['Extensions.closeSuggest'],
    ['Extensions.handleBlur'],
    ['Extensions.handleClickAt', 0, 10, 20, '@builtin'],
    ['Extensions.selectNextCompletion'],
    ['Extensions.selectPreviousCompletion'],
  ])
})

test('focus commands', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.focusFirst'() {
      return undefined
    },
    'Extensions.focusLast'() {
      return undefined
    },
    'Extensions.focusNext'() {
      return undefined
    },
    'Extensions.focusPrevious'() {
      return undefined
    },
  })

  await ExtensionSearch.focusFirst()
  await ExtensionSearch.focusLast()
  await ExtensionSearch.focusNext()
  await ExtensionSearch.focusPrevious()

  expect(mockRpc.invocations).toEqual([['Extensions.focusFirst'], ['Extensions.focusLast'], ['Extensions.focusNext'], ['Extensions.focusPrevious']])
})

test('extension action commands', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Extensions.handleSettingsButtonClick'() {
      return undefined
    },
    'Extensions.handleUninstall'() {
      return undefined
    },
  })

  await ExtensionSearch.handleSettingsButtonClick(2)
  await ExtensionSearch.handleUninstall('test.extension')

  expect(mockRpc.invocations).toEqual([
    ['Extensions.handleSettingsButtonClick', 2],
    ['Extensions.handleUninstall', 'test.extension'],
  ])
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
    ['Extensions.handleInput', 'search term', InputSource.Script, 11],
    ['Extensions.handleClickFilter'],
    ['Extensions.handleClick', 2],
    ['Extensions.copyExtensionInfo'],
    ['Extensions.clearSearchResults'],
  ])
})
