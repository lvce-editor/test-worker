import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Callback from '../src/parts/Callback/Callback.js'

test('executeCallback function exists and is exported', () => {
  expect(Callback.executeCallback).toBeDefined()
  expect(typeof Callback.executeCallback).toBe('function')
})

test('registerCallbackCommand function exists and is exported', () => {
  expect(Callback.registerCallbackCommand).toBeDefined()
  expect(typeof Callback.registerCallbackCommand).toBe('function')
})

test('executeCallback handles non-existent callback id', () => {
  const nonExistentId = 999_999

  // When callback doesn't exist, fn is undefined and calling it throws
  expect(() => {
    Callback.executeCallback(nonExistentId)
  }).toThrow('fn is not a function')
})

test('registerCallbackCommand returns promise object', async () => {
  const commandId = 'test-command'

  using mockRpc = RendererWorker.registerMockRpc({
    async 'Test.registerTestCommand'(id: string) {
      return
    },
  })

  const result = await Callback.registerCallbackCommand(commandId)
  expect(result).toBeDefined()
  expect(result.promise).toBeDefined()
  expect(typeof result.promise.then).toBe('function')

  // Verify the RPC was called
  expect(mockRpc.invocations).toEqual([['Test.registerTestCommand', commandId]])
})

test('registerCallbackCommand works with different command IDs', async () => {
  const commandIds = ['test-command', 'another-command', 'command-with-dashes', 'command_with_underscores', 'command123']

  for (const commandId of commandIds) {
    using mockRpc = RendererWorker.registerMockRpc({
      async 'Test.registerTestCommand'(id: string) {
        return
      },
    })

    const result = await Callback.registerCallbackCommand(commandId)
    expect(result).toBeDefined()
    expect(result.promise).toBeDefined()

    // Verify the RPC was called
    expect(mockRpc.invocations).toEqual([['Test.registerTestCommand', commandId]])
  }
})
