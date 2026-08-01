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
