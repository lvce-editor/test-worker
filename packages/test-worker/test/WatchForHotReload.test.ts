import { expect, test } from '@jest/globals'
import { PlatformType, RpcId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as WatchForHotReload from '../src/parts/WatchForHotReload/WatchForHotReload.js'

test('watchForHotReload returns early when platform is not Remote', async () => {
  const href = '/some/path'

  using mockRpc = RendererWorker.registerMockRpc({})

  await WatchForHotReload.watchForHotReload(PlatformType.Web, href)

  expect(mockRpc.invocations).toEqual([])
})

test('watchForHotReload returns early when href does not start with /remote', async () => {
  const href = '/some/other/path'

  using mockRpc = RendererWorker.registerMockRpc({})

  await WatchForHotReload.watchForHotReload(PlatformType.Remote, href)

  expect(mockRpc.invocations).toEqual([])
})

test('watchForHotReload calls RendererWorker.invoke when conditions are met', async () => {
  const href = '/remote/some/file'
  const expectedFileUrl = 'file:///some/file'

  using mockRpc = RendererWorker.registerMockRpc({
    async 'FileWatcher.watchFile'(rpcId: string, callbackCommand: string, fileUrl: string): Promise<void> {
      expect(rpcId).toBe(RpcId.TestWorker)
      expect(callbackCommand).toBe('FileWatcher.handleEvent')
      expect(fileUrl).toBe(expectedFileUrl)
    },
  })

  await WatchForHotReload.watchForHotReload(PlatformType.Remote, href)

  expect(mockRpc.invocations).toEqual([['FileWatcher.watchFile', RpcId.TestWorker, 'FileWatcher.handleEvent', expectedFileUrl]])
})

test('watchForHotReload handles different remote hrefs', async () => {
  const testCases = ['/remote/file1.txt', '/remote/path/to/file2.js', '/remote/deep/nested/path/file3.json']

  for (const href of testCases) {
    const rest = href.slice('/remote'.length)
    const expectedFileUrl = `file://${rest}`

    using mockRpc = RendererWorker.registerMockRpc({
      async 'FileWatcher.watchFile'(rpcId: string, callbackCommand: string, fileUrl: string): Promise<void> {
        expect(rpcId).toBe(RpcId.TestWorker)
        expect(callbackCommand).toBe('FileWatcher.handleEvent')
        expect(fileUrl).toBe(expectedFileUrl)
      },
    })

    await WatchForHotReload.watchForHotReload(PlatformType.Remote, href)

    expect(mockRpc.invocations).toEqual([['FileWatcher.watchFile', RpcId.TestWorker, 'FileWatcher.handleEvent', expectedFileUrl]])
  }
})
