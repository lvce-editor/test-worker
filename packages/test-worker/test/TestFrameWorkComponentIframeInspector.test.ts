import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as IframeInspector from '../src/parts/TestFrameWorkComponentIframeInspector/TestFrameWorkComponentIframeInspector.ts'

test('selectIndex', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'IframeInspector.selectIndex'() {
      return undefined
    },
  })
  await IframeInspector.selectIndex(2)
  expect(mockRpc.invocations).toEqual([['IframeInspector.selectIndex', 2]])
})

test('focus navigation methods', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'IframeInspector.focusNext'() {
      return undefined
    },
    'IframeInspector.focusPrevious'() {
      return undefined
    },
    'IframeInspector.focusFirst'() {
      return undefined
    },
    'IframeInspector.focusLast'() {
      return undefined
    },
  })
  await IframeInspector.focusNext()
  await IframeInspector.focusPrevious()
  await IframeInspector.focusFirst()
  await IframeInspector.focusLast()
  expect(mockRpc.invocations).toEqual([
    ['IframeInspector.focusNext'],
    ['IframeInspector.focusPrevious'],
    ['IframeInspector.focusFirst'],
    ['IframeInspector.focusLast']
  ])
})
