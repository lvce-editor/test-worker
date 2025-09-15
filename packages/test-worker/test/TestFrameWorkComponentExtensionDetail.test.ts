import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ExtensionDetail from '../src/parts/TestFrameWorkComponentExtensionDetail/TestFrameWorkComponentExtensionDetail.ts'

test('handleClickCategory', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.handleClickCategory'() {
      return undefined
    },
  })
  await ExtensionDetail.handleClickCategory('cat')
  expect(mockRpc.invocations).toEqual([['ExtensionDetail.handleClickCategory', 'cat']])
})

test('handleClickEnable/Disable/SetColorTheme', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.handleClickEnable'() {
      return undefined
    },
    'ExtensionDetail.handleClickDisable'() {
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
  const mockRpc = RendererWorker.registerMockRpc({
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
  const mockRpc = RendererWorker.registerMockRpc({
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
  const mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri'() {
      return undefined
    },
  })
  await ExtensionDetail.open('my.ext')
  expect(mockRpc.invocations).toEqual([['Main.openUri', 'extension-detail://my.ext']])
})

test('openFeature and openThemes/Commands/WebViews/RuntimeStatus/JsonValidation/Settings', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
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
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionDetail.handleScroll'() {
      return undefined
    },
  })
  await ExtensionDetail.handleScroll(123)
  expect(mockRpc.invocations).toEqual([['ExtensionDetail.handleScroll', 123]])
})
