import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as SettingsView from '../src/parts/TestFrameWorkComponentSettingsView/TestFrameWorkComponentSettingsView.ts'

test('show', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri'() {
      return undefined
    },
  })

  await SettingsView.show()
  expect(mockRpc.invocations).toEqual([['Main.openUri', 'settings://']])
})

test('handleInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Settings.handleInput'() {
      return undefined
    },
  })

  await SettingsView.handleInput('search text')
  expect(mockRpc.invocations).toEqual([['Settings.handleInput', 'search text', InputSource.Script]])
})

test('usePreviousSearchValue', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Settings.usePreviousSearchValue'() {
      return undefined
    },
  })

  await SettingsView.usePreviousSearchValue()
  expect(mockRpc.invocations).toEqual([['Settings.usePreviousSearchValue']])
})

test('useNextSearchValue', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Settings.useNextSearchValue'() {
      return undefined
    },
  })

  await SettingsView.useNextSearchValue()
  expect(mockRpc.invocations).toEqual([['Settings.useNextSearchValue']])
})

test('clear', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Settings.clear'() {
      return undefined
    },
  })

  await SettingsView.clear('query')
  expect(mockRpc.invocations).toEqual([['Settings.clear', 'query', InputSource.Script]])
})

test('selectWorkspace', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Settings.handleClickTab'() {
      return undefined
    },
  })

  await SettingsView.selectWorkspace()
  expect(mockRpc.invocations).toEqual([['Settings.handleClickTab', 'workspace']])
})

test('selectTextEditor', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Settings.handleClickTab'() {
      return undefined
    },
  })

  await SettingsView.selectTextEditor()
  expect(mockRpc.invocations).toEqual([['Settings.handleClickTab', 'text-editor']])
})

test('selectExtensions', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Settings.handleClickTab'() {
      return undefined
    },
  })

  await SettingsView.selectExtensions()
  expect(mockRpc.invocations).toEqual([['Settings.handleClickTab', 'extensions']])
})

test('handleScroll', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Settings.handleScroll'() {
      return undefined
    },
  })

  await SettingsView.handleScroll(250)
  expect(mockRpc.invocations).toEqual([['Settings.handleScroll', 250, InputSource.Script]])
})
