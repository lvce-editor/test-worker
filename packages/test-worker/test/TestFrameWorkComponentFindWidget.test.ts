import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as FindWidget from '../src/parts/TestFrameWorkComponentFindWidget/TestFrameWorkComponentFindWidget.ts'

test('focusNext', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      return undefined
    },
  })

  await FindWidget.focusNext()

  expect(mockRpc.invocations).toEqual([
    ['FindWidget.focusNext']
  ])
})

test('setValue', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      return undefined
    },
  })

  await FindWidget.setValue('hello')

  expect(mockRpc.invocations).toEqual([
    ['FindWidget.handleInput', 'hello', 2]
  ])
})
