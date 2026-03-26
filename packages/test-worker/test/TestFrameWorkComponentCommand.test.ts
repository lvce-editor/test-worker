import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
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

test('execute Chat.getAuthState', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Chat.getAuthState'() {
      return {
        authenticated: true,
      }
    },
  })

  const result: any = await Command.execute('Chat.getAuthState')

  expect(result).toEqual({
    authenticated: true,
  })
  expect(mockRpc.invocations).toEqual([['Chat.getAuthState']])
})
