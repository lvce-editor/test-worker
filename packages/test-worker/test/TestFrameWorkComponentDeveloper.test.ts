import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Developer from '../src/parts/TestFrameWorkComponentDeveloper/TestFrameWorkComponentDeveloper.ts'

test('openIframeInspector', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Developer.openIframeInspector'() {
      return undefined
    },
  })
  await Developer.openIframeInspector()
  expect(mockRpc.invocations).toEqual([['Developer.openIframeInspector']])
})

test('openCacheFolder', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Developer.openCacheFolder'() {
      return undefined
    },
  })
  await Developer.openCacheFolder()
  expect(mockRpc.invocations).toEqual([['Developer.openCacheFolder']])
})

test('openConfigFolder', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Developer.openConfigFolder'() {
      return undefined
    },
  })
  await Developer.openConfigFolder()
  expect(mockRpc.invocations).toEqual([['Developer.openConfigFolder']])
})

test('openLogsFolder', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Developer.openLogsFolder'() {
      return undefined
    },
  })
  await Developer.openLogsFolder()
  expect(mockRpc.invocations).toEqual([['Developer.openLogsFolder']])
})

test('openProcessExplorer', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Developer.openProcessExplorer'() {
      return undefined
    },
  })
  await Developer.openProcessExplorer()
  expect(mockRpc.invocations).toEqual([['Developer.openProcessExplorer']])
})

test('reloadColorTheme and reloadIconTheme and toggleDeveloperTools', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Developer.reloadColorTheme'() {
      return undefined
    },
    'Developer.reloadIconTheme'() {
      return undefined
    },
    'Developer.toggleDeveloperTools'() {
      return undefined
    },
  })
  await Developer.reloadColorTheme()
  await Developer.reloadIconTheme()
  await Developer.toggleDeveloperTools()
  expect(mockRpc.invocations).toEqual([['Developer.reloadColorTheme'], ['Developer.reloadIconTheme'], ['Developer.toggleDeveloperTools']])
})
