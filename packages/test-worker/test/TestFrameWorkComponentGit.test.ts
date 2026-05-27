import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Git from '../src/parts/TestFrameWorkComponentGit/TestFrameWorkComponentGit.ts'

test('init', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.init'() {
      return undefined
    },
  })

  await Git.init('file:///workspace')
  expect(mockRpc.invocations).toEqual([['Git.init', 'file:///workspace']])
})

test('clone', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.clone'() {
      return undefined
    },
  })

  await Git.clone('https://github.com/lvce-editor/test-worker.git', '/workspace')
  expect(mockRpc.invocations).toEqual([['Git.clone', 'https://github.com/lvce-editor/test-worker.git', '/workspace']])
})

test('add', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.add'() {
      return undefined
    },
  })

  await Git.add('file:///workspace', '.')
  expect(mockRpc.invocations).toEqual([['Git.add', 'file:///workspace', '.']])
})

test('commit', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.commit'() {
      return undefined
    },
  })

  await Git.commit('file:///workspace', 'feat: initial commit')
  expect(mockRpc.invocations).toEqual([['Git.commit', 'file:///workspace', 'feat: initial commit']])
})

test('push', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.push'() {
      return undefined
    },
  })

  await Git.push('file:///workspace', 'origin', 'main')
  expect(mockRpc.invocations).toEqual([['Git.push', 'file:///workspace', 'origin', 'main']])
})

test('pull', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.pull'() {
      return undefined
    },
  })

  await Git.pull('file:///workspace', 'origin', 'main')
  expect(mockRpc.invocations).toEqual([['Git.pull', 'file:///workspace', 'origin', 'main']])
})

test('fetch', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.fetch'() {
      return undefined
    },
  })

  await Git.fetch('file:///workspace', 'origin')
  expect(mockRpc.invocations).toEqual([['Git.fetch', 'file:///workspace', 'origin']])
})

test('checkout', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.checkout'() {
      return undefined
    },
  })

  await Git.checkout('file:///workspace', 'feature/test')
  expect(mockRpc.invocations).toEqual([['Git.checkout', 'file:///workspace', 'feature/test']])
})

test('branch', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.branch'() {
      return undefined
    },
  })

  await Git.branch('file:///workspace', 'feature/test')
  expect(mockRpc.invocations).toEqual([['Git.branch', 'file:///workspace', 'feature/test']])
})

test('status', async () => {
  const gitStatus = { branch: 'main', staged: ['a.ts'], unstaged: ['b.ts'] }
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.status'() {
      return gitStatus
    },
  })

  const result = await Git.status('file:///workspace')
  expect(result).toBe(gitStatus)
  expect(mockRpc.invocations).toEqual([['Git.status', 'file:///workspace']])
})

test('addRemote', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.addRemote'() {
      return undefined
    },
  })

  await Git.addRemote('file:///workspace', 'origin', 'https://github.com/lvce-editor/test-worker.git')
  expect(mockRpc.invocations).toEqual([
    ['Git.addRemote', 'file:///workspace', 'origin', 'https://github.com/lvce-editor/test-worker.git'],
  ])
})

test('setConfig', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.setConfig'() {
      return undefined
    },
  })

  await Git.setConfig('file:///workspace', 'user.name', 'Lvce Editor')
  expect(mockRpc.invocations).toEqual([['Git.setConfig', 'file:///workspace', 'user.name', 'Lvce Editor']])
})
