import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Git from '../src/parts/TestFrameWorkComponentGit/TestFrameWorkComponentGit.ts'

test('init', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.init'() {
      return undefined
    },
  })

  await Git.init()
  expect(mockRpc.invocations).toEqual([['Git.init']])
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

  await Git.add('.')
  expect(mockRpc.invocations).toEqual([['Git.add', '.']])
})

test('commit', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.commit'() {
      return undefined
    },
  })

  await Git.commit('feat: initial commit')
  expect(mockRpc.invocations).toEqual([['Git.commit', 'feat: initial commit']])
})

test('push', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.push'() {
      return undefined
    },
  })

  await Git.push('origin', 'main')
  expect(mockRpc.invocations).toEqual([['Git.push', 'origin', 'main']])
})

test('pull', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.pull'() {
      return undefined
    },
  })

  await Git.pull('origin', 'main')
  expect(mockRpc.invocations).toEqual([['Git.pull', 'origin', 'main']])
})

test('fetch', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.fetch'() {
      return undefined
    },
  })

  await Git.fetch('origin')
  expect(mockRpc.invocations).toEqual([['Git.fetch', 'origin']])
})

test('checkout', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.checkout'() {
      return undefined
    },
  })

  await Git.checkout('feature/test')
  expect(mockRpc.invocations).toEqual([['Git.checkout', 'feature/test']])
})

test('branch', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.branch'() {
      return undefined
    },
  })

  await Git.branch('feature/test')
  expect(mockRpc.invocations).toEqual([['Git.branch', 'feature/test']])
})

test('status', async () => {
  const gitStatus = { branch: 'main', staged: ['a.ts'], unstaged: ['b.ts'] }
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.status'() {
      return gitStatus
    },
  })

  const result = await Git.status()
  expect(result).toBe(gitStatus)
  expect(mockRpc.invocations).toEqual([['Git.status']])
})

test('addRemote', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.addRemote'() {
      return undefined
    },
  })

  await Git.addRemote('origin', 'https://github.com/lvce-editor/test-worker.git')
  expect(mockRpc.invocations).toEqual([['Git.addRemote', 'origin', 'https://github.com/lvce-editor/test-worker.git']])
})

test('setConfig', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Git.setConfig'() {
      return undefined
    },
  })

  await Git.setConfig('user.name', 'Lvce Editor')
  expect(mockRpc.invocations).toEqual([['Git.setConfig', 'user.name', 'Lvce Editor']])
})
