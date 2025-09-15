import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Panel from '../src/parts/TestFrameWorkComponentPanel/TestFrameWorkComponentPanel.ts'

test('open', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.showPanel'() {
      return undefined
    },
  })

  await Panel.open('test-panel')
  expect(mockRpc.invocations).toEqual([['Layout.showPanel', 'test-panel']])
})

test('openProblems', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.showPanel'() {
      return undefined
    },
    'Panel.selectIndex'() {
      return undefined
    },
  })

  await Panel.openProblems()
  expect(mockRpc.invocations).toEqual([
    ['Layout.showPanel', 'Problems'],
    ['Panel.selectIndex', 0]
  ])
})
