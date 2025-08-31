import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Developer from '../src/parts/TestFrameWorkComponentDeveloper/TestFrameWorkComponentDeveloper.ts'

test('openIframeInspector', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)
  await Developer.openIframeInspector()
  expect(mockInvoke).toHaveBeenCalledWith('Developer.openIframeInspector')
})

test('openCacheFolder', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)
  await Developer.openCacheFolder()
  expect(mockInvoke).toHaveBeenCalledWith('Developer.openCacheFolder')
})

test('openConfigFolder', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)
  await Developer.openConfigFolder()
  expect(mockInvoke).toHaveBeenCalledWith('Developer.openConfigFolder')
})

test('openLogsFolder', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)
  await Developer.openLogsFolder()
  expect(mockInvoke).toHaveBeenCalledWith('Developer.openLogsFolder')
})

test('openProcessExplorer', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)
  await Developer.openProcessExplorer()
  expect(mockInvoke).toHaveBeenCalledWith('Developer.openProcessExplorer')
})

test('reloadColorTheme and reloadIconTheme and toggleDeveloperTools', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)
  await Developer.reloadColorTheme()
  await Developer.reloadIconTheme()
  await Developer.toggleDeveloperTools()
  expect(mockInvoke).toHaveBeenCalledWith('Developer.reloadColorTheme')
  expect(mockInvoke).toHaveBeenCalledWith('Developer.reloadIconTheme')
  expect(mockInvoke).toHaveBeenCalledWith('Developer.toggleDeveloperTools')
})
