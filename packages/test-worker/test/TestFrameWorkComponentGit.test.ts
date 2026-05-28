import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Git from '../src/parts/TestFrameWorkComponentGit/TestFrameWorkComponentGit.ts'

test('init', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.init()
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.init', {}]])
})

test('init with options', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.init({
    bare: true,
    initialBranch: 'main',
    uri: '/workspace/remote.git',
  })
  expect(mockRpc.invocations).toEqual([
    ['ExtensionHost.executeCommand', 'git.init', { bare: true, initialBranch: 'main', uri: '/workspace/remote.git' }],
  ])
})

test('clone', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.clone('https://github.com/lvce-editor/test-worker.git', '/workspace')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.clone', 'https://github.com/lvce-editor/test-worker.git', '/workspace']])
})

test('add', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.add('.')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.add', '.']])
})

test('addAll', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.addAll()
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.add', '.']])
})

test('commit', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.commit('feat: initial commit')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.commit', 'feat: initial commit']])
})

test('push', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.push('origin', 'main')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.push', { setUpstream: ['origin', 'main'] }]])
})

test('push with options', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.push({ setUpstream: ['origin', 'main'] })
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.push', { setUpstream: ['origin', 'main'] }]])
})

test('pull', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.pull('origin', 'main')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.pull', 'origin', 'main']])
})

test('fetch', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.fetch('origin')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.fetch', 'origin']])
})

test('fetchAll', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.fetchAll()
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.fetchAll']])
})

test('fetchPrune', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.fetchPrune()
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.fetchPrune']])
})

test('stash', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.stash()
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.stash']])
})

test('stash with message', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.stash('wip: save local changes')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.stash', 'wip: save local changes']])
})

test('unstash', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.unstash()
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.unstash']])
})

test('checkout', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.checkout('feature/test')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.checkout', 'feature/test']])
})

test('branch', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.branch('feature/test')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.branch', 'feature/test']])
})

test('deleteBranch', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.deleteBranch('feature/test')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.deleteBranch', 'feature/test']])
})

test('renameBranch', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.renameBranch('feature/renamed')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.renameBranch', 'feature/renamed']])
})

test('cherryPick', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.cherryPick('abc123')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.cherryPick', 'abc123']])
})

test('merge', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.merge('origin/main')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.merge', 'origin/main']])
})

test('rebase', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.rebase('origin/main')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.rebase', 'origin/main']])
})

test('createTag', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.createTag('v1.0.0')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.createTag', 'v1.0.0']])
})

test('deleteTag', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.deleteTag('v1.0.0')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.deleteTag', 'v1.0.0']])
})

test('status', async () => {
  const gitStatus = { branch: 'main', staged: ['a.ts'], unstaged: ['b.ts'] }
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return gitStatus
    },
  })

  const result = await Git.status()
  expect(result).toBe(gitStatus)
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.status']])
})

test('addRemote', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.addRemote('origin', 'https://github.com/lvce-editor/test-worker.git')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.addRemote', 'origin', 'https://github.com/lvce-editor/test-worker.git']])
})

test('setOrigin', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.setOrigin('https://github.com/lvce-editor/test-worker.git')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.addRemote', 'origin', 'https://github.com/lvce-editor/test-worker.git']])
})

test('setUpstream', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.setUpstream('https://github.com/lvce-editor/lvce-editor.git')
  expect(mockRpc.invocations).toEqual([
    ['ExtensionHost.executeCommand', 'git.addRemote', 'upstream', 'https://github.com/lvce-editor/lvce-editor.git'],
  ])
})
test('removeRemote', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.removeRemote('origin')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.removeRemote', 'origin']])
})
test('removeOrigin', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.removeOrigin()
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.removeRemote', 'origin']])
})

test('removeUpstream', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.removeUpstream()
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.removeRemote', 'upstream']])
})
test('setConfig', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.setConfig('user.name', 'Lvce Editor')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.setConfig', 'user.name', 'Lvce Editor']])
})

test('config', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await Git.config({
    'user.email': 'user@example.com',
    'user.name': 'Lvce Editor',
  })
  expect(mockRpc.invocations).toEqual([
    ['ExtensionHost.executeCommand', 'git.setConfig', 'user.email', 'user@example.com'],
    ['ExtensionHost.executeCommand', 'git.setConfig', 'user.name', 'Lvce Editor'],
  ])
})

test('shouldHaveCommit throws when commits is not an array', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return undefined
    },
  })

  await expect(Git.shouldHaveCommit('feat: initial commit')).rejects.toThrow(new TypeError('Expected commits to be an array, but got undefined'))
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.getCommits']])
})

test('shouldHaveCommit throws when commit count does not match', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return []
    },
  })

  await expect(Git.shouldHaveCommit('feat: initial commit')).rejects.toThrow(new Error('Expected 1 commit, but got 0'))
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.getCommits']])
})

test('shouldHaveCommit throws when commit hash is missing', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return [
        {
          hash: '',
          message: 'feat: initial commit',
        },
      ]
    },
  })

  await expect(Git.shouldHaveCommit('feat: initial commit')).rejects.toThrow(new Error('Expected commit hash to be defined'))
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.getCommits']])
})

test('shouldHaveCommit throws when commit message does not match', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return [
        {
          hash: 'abc123',
          message: 'feat: unexpected commit',
        },
      ]
    },
  })

  await expect(Git.shouldHaveCommit('feat: initial commit')).rejects.toThrow(
    new Error('Expected commit message to be "feat: initial commit", but got "feat: unexpected commit"'),
  )
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.getCommits']])
})

test('shouldHaveCommit succeeds when commit matches', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.executeCommand'() {
      return [
        {
          hash: 'abc123',
          message: 'feat: initial commit',
        },
      ]
    },
  })

  await expect(Git.shouldHaveCommit('feat: initial commit')).resolves.toBeUndefined()
  expect(mockRpc.invocations).toEqual([['ExtensionHost.executeCommand', 'git.getCommits']])
})
