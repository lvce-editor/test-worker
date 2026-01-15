import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ExtensionDetail from '../src/parts/TestFrameWorkComponentExtensionDetail/TestFrameWorkComponentExtensionDetail.ts'

test('handleClickCategory', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.handleClickCategory'() {
      return undefined
    },
  })
  await ExtensionDetail.handleClickCategory('cat')
  expect(mockRpc.invocations).toEqual([['ExtensionDetail.handleClickCategory', 'cat']])
})

test('handleClickEnable/Disable/SetColorTheme', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.handleClickDisable'() {
      return undefined
    },
    'ExtensionDetail.handleClickEnable'() {
      return undefined
    },
    'ExtensionDetail.handleClickSetColorTheme'() {
      return undefined
    },
  })
  await ExtensionDetail.handleClickEnable()
  await ExtensionDetail.handleClickDisable()
  await ExtensionDetail.handleClickSetColorTheme()
  expect(mockRpc.invocations).toEqual([
    ['ExtensionDetail.handleClickEnable'],
    ['ExtensionDetail.handleClickDisable'],
    ['ExtensionDetail.handleClickSetColorTheme'],
  ])
})

test('selectFeature and selectTab', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.selectFeature'() {
      return undefined
    },
    'ExtensionDetail.selectTab'() {
      return undefined
    },
  })
  await ExtensionDetail.selectFeature('feat')
  await ExtensionDetail.selectTab('tab')
  expect(mockRpc.invocations).toEqual([
    ['ExtensionDetail.selectFeature', 'feat'],
    ['ExtensionDetail.selectTab', 'tab'],
  ])
})

test('selectDetails/Features/Changelog', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.selectTab'() {
      return undefined
    },
  })
  await ExtensionDetail.selectDetails()
  await ExtensionDetail.selectFeatures()
  await ExtensionDetail.selectChangelog()
  expect(mockRpc.invocations).toEqual([
    ['ExtensionDetail.selectTab', 'Details'],
    ['ExtensionDetail.selectTab', 'Features'],
    ['ExtensionDetail.selectTab', 'Changelog'],
  ])
})

test('open opens uri', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri'() {
      return undefined
    },
  })
  await ExtensionDetail.open('my.ext')
  expect(mockRpc.invocations).toEqual([['Main.openUri', 'extension-detail://my.ext']])
})

test('openFeature and openThemes/Commands/WebViews/RuntimeStatus/JsonValidation/Settings', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.handleFeaturesClick'() {
      return undefined
    },
  })
  await ExtensionDetail.openFeature('FeatureX')
  await ExtensionDetail.openThemes()
  await ExtensionDetail.openCommands()
  await ExtensionDetail.openWebViews()
  await ExtensionDetail.openRuntimeStatus()
  await ExtensionDetail.openJsonValidation()
  await ExtensionDetail.openSettings()
  expect(mockRpc.invocations).toEqual([
    ['ExtensionDetail.handleFeaturesClick', 'FeatureX'],
    ['ExtensionDetail.handleFeaturesClick', 'Theme'],
    ['ExtensionDetail.handleFeaturesClick', 'Commands'],
    ['ExtensionDetail.handleFeaturesClick', 'WebView'],
    ['ExtensionDetail.handleFeaturesClick', 'RuntimeStatus'],
    ['ExtensionDetail.handleFeaturesClick', 'JsonValidation'],
    ['ExtensionDetail.handleFeaturesClick', 'Settings'],
  ])
})

test('handleScroll', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.handleScroll'() {
      return undefined
    },
  })
  await ExtensionDetail.handleScroll(123)
  expect(mockRpc.invocations).toEqual([['ExtensionDetail.handleScroll', 123]])
})

test('handleReadmeContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.handleReadmeContextMenu'() {
      return undefined
    },
  })
  await ExtensionDetail.handleReadmeContextMenu(100, 200, 'nodeName', 'http://example.com')
  expect(mockRpc.invocations).toEqual([['ExtensionDetail.handleReadmeContextMenu', 100, 200, 'nodeName', 'http://example.com']])
})

test('copyReadmeLink', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.copyReadmeLink'() {
      return undefined
    },
  })
  await ExtensionDetail.copyReadmeLink('http://example.com/link')
  expect(mockRpc.invocations).toEqual([['ExtensionDetail.copyReadmeLink', 'http://example.com/link']])
})

test('focusNextTab and focusPreviousTab', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.focusNextTab'() {
      return undefined
    },
    'ExtensionDetail.focusPreviousTab'() {
      return undefined
    },
  })
  await ExtensionDetail.focusNextTab()
  await ExtensionDetail.focusPreviousTab()
  expect(mockRpc.invocations).toEqual([['ExtensionDetail.focusNextTab'], ['ExtensionDetail.focusPreviousTab']])
})

test('handleClickUninstall', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.handleClickUninstall'() {
      return undefined
    },
  })
  await ExtensionDetail.handleClickUninstall()
  expect(mockRpc.invocations).toEqual([['ExtensionDetail.handleClickUninstall']])
})

test('handleImageContextMenu', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.handleImageContextMenu'() {
      return undefined
    },
  })
  await ExtensionDetail.handleImageContextMenu()
  expect(mockRpc.invocations).toEqual([['ExtensionDetail.handleImageContextMenu']])
})

test('hideSizeLink', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.hideSizeLink'() {
      return undefined
    },
  })
  await ExtensionDetail.hideSizeLink()
  expect(mockRpc.invocations).toEqual([['ExtensionDetail.hideSizeLink']])
})

test('handleTabFocus', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.handleTabFocus'() {
      return undefined
    },
  })
  await ExtensionDetail.handleTabFocus('Details')
  expect(mockRpc.invocations).toEqual([['ExtensionDetail.handleTabFocus', 'Details']])
})
