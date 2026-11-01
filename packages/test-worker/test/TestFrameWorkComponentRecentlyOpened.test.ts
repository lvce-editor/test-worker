import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as RecentlyOpened from '../src/parts/TestFrameWorkComponentRecentlyOpened/TestFrameWorkComponentRecentlyOpened.ts'

test('clear', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.clearRecentlyOpened'() {
      return undefined
    },
  })
  await RecentlyOpened.clear()
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.clearRecentlyOpened']])
})

test('add', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.addToRecentlyOpened'() {
      return undefined
    },
  })
  await RecentlyOpened.add('remote-ssh://example/project')
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.addToRecentlyOpened', 'remote-ssh://example/project']])
})

test('get', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.getRecentlyOpened'() {
      return ['file:///project']
    },
  })
  await expect(RecentlyOpened.get()).resolves.toEqual(['file:///project'])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('remove', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'RecentlyOpened.removeRecentlyOpened'() {
      return undefined
    },
  })
  await RecentlyOpened.remove('file:///project')
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.removeRecentlyOpened', 'file:///project']])
})
