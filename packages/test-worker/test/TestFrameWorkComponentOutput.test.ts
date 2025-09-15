import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Output from '../src/parts/TestFrameWorkComponentOutput/TestFrameWorkComponentOutput.ts'

test('show', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      return undefined
    },
  })

  await Output.show()

  expect(mockRpc.invocations).toEqual([
    ['Panel.selectIndex', 1]
  ])
})

test('handleFilterInput', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      return undefined
    },
  })

  await Output.handleFilterInput('test filter')

  expect(mockRpc.invocations).toEqual([
    ['Output.handleFilterInput', 'test filter', 2]
  ])
})

test('selectChannel', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      return undefined
    },
  })

  await Output.selectChannel('test-channel-id')

  expect(mockRpc.invocations).toEqual([
    ['Output.selectChannel', 'test-channel-id']
  ])
})
