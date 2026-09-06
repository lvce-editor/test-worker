/* eslint-disable sonarjs/no-dead-store -- using bindings dispose RPC registrations after each test. */
import { afterEach, expect, jest, test } from '@jest/globals'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as Devcontainer from '../src/parts/TestFrameWorkComponentDevcontainer/TestFrameWorkComponentDevcontainer.ts'

const outputPattern = /hello/g
const missingOutputPattern = /missing/

const mockQuickPick = (): ReturnType<typeof RendererWorker.registerMockRpc> =>
  RendererWorker.registerMockRpc({
    'QuickPick.selectItem'() {},
    'QuickPick.setValue'() {},
    'TestFrameWork.checkMultiElementCondition'() {},
    'Viewlet.openWidget'() {},
  })

afterEach(() => {
  jest.useRealTimers()
})

test('start selects the visible Quick Pick command and waits through startup', async () => {
  jest.useFakeTimers()
  using quickPick = mockQuickPick()
  const states = [{ status: 'stopped' }, { status: 'starting' }, { containerId: 'container-1', status: 'running' }]
  using rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      return states.shift()
    },
  })
  await Promise.all([expect(Devcontainer.start()).resolves.toBeUndefined(), jest.advanceTimersByTimeAsync(200)])
  expect(quickPick.invocations[0]).toEqual(['Viewlet.openWidget', 'QuickPick', 'everything'])
  expect(quickPick.invocations[1]).toEqual(['QuickPick.setValue', '>Dev Containers: Start Current Workspace'])
  expect(quickPick.invocations[2]).toEqual([
    'TestFrameWork.checkMultiElementCondition',
    [
      { selector: '.QuickPickItem', type: 'css' },
      { text: 'Dev Containers: Start Current Workspace', type: 'has-text' },
    ],
    'toHaveCount',
    { count: 1 },
  ])
  expect(quickPick.invocations[3]).toEqual(['QuickPick.selectItem', 'Dev Containers: Start Current Workspace'])
  expect(rpc.invocations).toEqual(Array.from({ length: 3 }, () => ['Extensions.executeCommand', 'devcontainer.getState']))
})

test('stop waits for the asynchronous stop command', async () => {
  jest.useFakeTimers()
  using quickPick = mockQuickPick()
  const states = [
    { containerId: 'container-1', status: 'running' },
    { containerId: 'container-1', status: 'stopped' },
  ]
  using rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      return states.shift()
    },
  })
  await Promise.all([expect(Devcontainer.stop({ timeout: 500 })).resolves.toBeUndefined(), jest.advanceTimersByTimeAsync(100)])
  expect(quickPick.invocations.at(-1)).toEqual(['QuickPick.selectItem', 'Dev Containers: Stop Current Workspace'])
})

test('start reports container failure immediately with CLI diagnostics', async () => {
  using quickPick = mockQuickPick()
  using rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      return { lastResult: { stderr: 'Cannot connect to Docker' }, status: 'error' }
    },
  })
  await expect(Devcontainer.start()).rejects.toThrow('Cannot connect to Docker')
})

test('start times out with the last known state', async () => {
  jest.useFakeTimers()
  using quickPick = mockQuickPick()
  using rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      return { status: 'starting' }
    },
  })
  await Promise.all([
    expect(Devcontainer.start({ timeout: 200 })).rejects.toThrow('Timed out waiting for devcontainer running: {"status":"starting"}'),
    jest.advanceTimersByTimeAsync(200),
  ])
})

test('start rejects running state without a container id', async () => {
  using quickPick = mockQuickPick()
  using rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      return { status: 'running' }
    },
  })
  await expect(Devcontainer.start()).rejects.toThrow('Missing devcontainer id')
})

test.each([undefined, null, 'invalid', {}, { status: 42 }, { containerId: 42, status: 'running' }])(
  'getState rejects malformed state %p',
  async (state) => {
    using rpc = ExtensionManagementWorker.registerMockRpc({
      'Extensions.executeCommand'() {
        return state
      },
    })
    await expect(Devcontainer.getState()).rejects.toThrow('Invalid devcontainer state')
  },
)

test('exec returns stdout and forwards command arguments', async () => {
  using rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      return { ok: true, stdout: 'v24.0.0\n' }
    },
  })
  await expect(Devcontainer.exec('node', ['--version'])).resolves.toBe('v24.0.0\n')
  await Devcontainer.exec('pwd')
  expect(rpc.invocations).toEqual([
    ['Extensions.executeCommand', 'devcontainer.exec', 'node', ['--version']],
    ['Extensions.executeCommand', 'devcontainer.exec', 'pwd', []],
  ])
})

test('exec reports CLI failure even when stdout exists', async () => {
  using rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      return { ok: false, stderr: 'permission denied', stdout: 'partial output' }
    },
  })
  await expect(Devcontainer.exec('cat')).rejects.toThrow('permission denied')
})

test('exec rejects success without stdout', async () => {
  using rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      return { ok: true }
    },
  })
  await expect(Devcontainer.exec('cat')).rejects.toThrow('Missing devcontainer stdout')
})

test('output assertions support exact text and reusable regular expressions', async () => {
  using rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      return { ok: true, stdout: 'hello\n' }
    },
  })
  await Devcontainer.shouldHaveExecOutput('cat', ['file.txt'], 'hello\n')
  const pattern = outputPattern
  await Devcontainer.shouldHaveExecOutput('cat', [], pattern)
  await Devcontainer.shouldHaveExecOutput('cat', [], pattern)
  await expect(Devcontainer.shouldHaveExecOutput('cat', [], 'hello')).rejects.toThrow('Expected devcontainer output')
  await expect(Devcontainer.shouldHaveExecOutput('cat', [], missingOutputPattern)).rejects.toThrow('Expected devcontainer output')
})

test.each([
  { errorCode: 'OTHER', ok: false },
  { errorCode: 'DEVCONTAINER_NOT_RUNNING', ok: true },
])('failure assertions check both the outcome and error code: %p', async (result) => {
  using rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      return result
    },
  })
  const promise = Devcontainer.shouldFailToExec('cat', ['file.txt'], 'DEVCONTAINER_NOT_RUNNING')
  await expect(promise).rejects.toThrow('Expected devcontainer execution to fail')
})

test('remove cleans up a stopped container and checks removal errors', async () => {
  using rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'(command: string) {
      if (command === 'devcontainer.getState') {
        return { containerId: 'container-1', status: 'stopped' }
      }
      return { ok: false, stderr: 'removal failed' }
    },
  })
  await expect(Devcontainer.remove()).rejects.toThrow('removal failed')
  expect(rpc.invocations.at(-1)).toEqual(['Extensions.executeCommand', 'devcontainer.remove'])
})

test.each([undefined, 'container-1'])('remove tolerates absent containers and removes existing ones: %p', async (containerId) => {
  using rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'(command: string) {
      return command === 'devcontainer.getState' ? { containerId, status: 'stopped' } : { ok: true }
    },
  })
  await Devcontainer.remove()
  expect(rpc.invocations).toHaveLength(containerId ? 2 : 1)
})

test('failure assertion accepts the expected error', async () => {
  using rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      return { errorCode: 'DEVCONTAINER_NOT_RUNNING', ok: false }
    },
  })
  await Devcontainer.shouldFailToExec('cat', ['file.txt'], 'DEVCONTAINER_NOT_RUNNING')
  expect(rpc.invocations).toEqual([['Extensions.executeCommand', 'devcontainer.exec', 'cat', ['file.txt']]])
})
