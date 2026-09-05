import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as Command from '../src/parts/TestFrameWorkComponentCommand/TestFrameWorkComponentCommand.ts'

test('execute', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Some.command'() {
      return 'ok'
    },
  })

  const result: any = await Command.execute('Some.command', 1, 2)

  expect(result).toBe('ok')
  expect(mockRpc.invocations).toEqual([['Some.command', 1, 2]])
})

test('executeExtensionCommand', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      return 'ok'
    },
  })

  const result = await Command.executeExtensionCommand('test.command', 1, 2)

  expect(result).toBe('ok')
  expect(mockRpc.invocations).toEqual([['Extensions.executeCommand', 'test.command', 1, 2]])
})

test('executeExtensionCommand preserves undefined results', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeCommand'() {
      return undefined
    },
  })

  await expect(Command.executeExtensionCommand('test.command')).resolves.toBeUndefined()
  expect(mockRpc.invocations).toEqual([['Extensions.executeCommand', 'test.command']])
})

test.each(['Command "test.command" not found (renderer worker)', 'Extension command failed'])(
  'executeExtensionCommand propagates errors without retrying: %s',
  async (message) => {
    const error = new Error(message)
    using mockRpc = ExtensionManagementWorker.registerMockRpc({
      'Extensions.executeCommand'() {
        throw error
      },
    })
    using mockRendererRpc = RendererWorker.registerMockRpc({
      'ExtensionHost.executeCommand'() {
        return 'unexpected retry'
      },
    })

    await expect(Command.executeExtensionCommand('test.command', 1, 2)).rejects.toThrow(error)
    expect(mockRpc.invocations).toEqual([['Extensions.executeCommand', 'test.command', 1, 2]])
    expect(mockRendererRpc.invocations).toEqual([])
  },
)
