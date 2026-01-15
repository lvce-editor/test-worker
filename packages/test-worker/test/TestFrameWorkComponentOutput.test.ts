import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Output from '../src/parts/TestFrameWorkComponentOutput/TestFrameWorkComponentOutput.ts'

test('show', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.showPanel'() {
      return undefined
    },
    'Panel.selectIndex'() {
      return undefined
    },
  })

  await Output.show()

  expect(mockRpc.invocations).toEqual([
    ['Layout.showPanel', 'Output'],
    ['Panel.selectIndex', 1],
  ])
})

test('handleFilterInput', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Output.handleFilterInput'() {
      return undefined
    },
  })

  await Output.handleFilterInput('test filter')

  expect(mockRpc.invocations).toEqual([['Output.handleFilterInput', 'test filter', 2]])
})

test('selectChannel', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Output.selectChannel'() {
      return undefined
    },
  })

  await Output.selectChannel('test-channel-id')

  expect(mockRpc.invocations).toEqual([['Output.selectChannel', 'test-channel-id']])
})

test('clear', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Output.clear'() {
      return undefined
    },
  })

  await Output.clear()

  expect(mockRpc.invocations).toEqual([['Output.clear']])
})
