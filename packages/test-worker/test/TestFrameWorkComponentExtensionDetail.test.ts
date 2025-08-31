import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ExtensionDetail from '../src/parts/TestFrameWorkComponentExtensionDetail/TestFrameWorkComponentExtensionDetail.ts'

const setup = (): jest.Mock => {
  const invoke: jest.Mock = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke })
  RendererWorker.set(mockRpc)
  return invoke
}

test('handleClickCategory', async () => {
  const invoke = setup()
  await ExtensionDetail.handleClickCategory('cat')
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.handleClickCategory', 'cat')
})

test('handleClickEnable/Disable/SetColorTheme', async () => {
  const invoke = setup()
  await ExtensionDetail.handleClickEnable()
  await ExtensionDetail.handleClickDisable()
  await ExtensionDetail.handleClickSetColorTheme()
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.handleClickEnable')
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.handleClickDisable')
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.handleClickSetColorTheme')
})

test('selectFeature and selectTab', async () => {
  const invoke = setup()
  await ExtensionDetail.selectFeature('feat')
  await ExtensionDetail.selectTab('tab')
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.selectFeature', 'feat')
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.selectTab', 'tab')
})

test('selectDetails/Features/Changelog', async () => {
  const invoke = setup()
  await ExtensionDetail.selectDetails()
  await ExtensionDetail.selectFeatures()
  await ExtensionDetail.selectChangelog()
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.selectTab', 'Details')
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.selectTab', 'Features')
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.selectTab', 'Changelog')
})

test('open opens uri', async () => {
  const invoke = setup()
  await ExtensionDetail.open('my.ext')
  expect(invoke).toHaveBeenCalledWith('Main.openUri', 'extension-detail://my.ext')
})

test('openFeature and openThemes/Commands/WebViews/RuntimeStatus/JsonValidation/Settings', async () => {
  const invoke = setup()
  await ExtensionDetail.openFeature('FeatureX')
  await ExtensionDetail.openThemes()
  await ExtensionDetail.openCommands()
  await ExtensionDetail.openWebViews()
  await ExtensionDetail.openRuntimeStatus()
  await ExtensionDetail.openJsonValidation()
  await ExtensionDetail.openSettings()
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.handleFeaturesClick', 'FeatureX')
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.handleFeaturesClick', 'Theme')
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.handleFeaturesClick', 'Commands')
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.handleFeaturesClick', 'WebView')
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.handleFeaturesClick', 'RuntimeStatus')
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.handleFeaturesClick', 'JsonValidation')
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.handleFeaturesClick', 'Settings')
})

test('handleScroll', async () => {
  const invoke = setup()
  await ExtensionDetail.handleScroll(123)
  expect(invoke).toHaveBeenCalledWith('ExtensionDetail.handleScroll', 123)
})
