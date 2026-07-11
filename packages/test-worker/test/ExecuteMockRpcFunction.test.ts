import { expect, test } from '@jest/globals'
import * as ExecuteMockRpcFunction from '../src/parts/ExecuteMockRpcFunction/ExecuteMockRpcFunction.ts'
import * as TestState from '../src/parts/TestState/TestState.ts'

test('executes a registered mock rpc command', async () => {
  TestState.setMockRpc({
    commands: {
      add(a: number, b: number): number {
        return a + b
      },
    },
    name: 'Git',
  })

  await expect(ExecuteMockRpcFunction.executeMockRpcFunction('Git', 'add', 2, 3)).resolves.toBe(5)
})

test('rejects a missing mock rpc', async () => {
  await expect(ExecuteMockRpcFunction.executeMockRpcFunction('Missing', 'add')).rejects.toThrow(new Error('mock rpc not found: Missing'))
})

test('rejects a missing mock rpc command', async () => {
  TestState.setMockRpc({ commands: {}, name: 'Empty' })
  await expect(ExecuteMockRpcFunction.executeMockRpcFunction('Empty', 'add')).rejects.toThrow(new TypeError('mock rpc command not found: Empty.add'))
})
