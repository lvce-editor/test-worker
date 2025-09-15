import { expect, test } from '@jest/globals'
import * as IframeInspector from '../src/parts/TestFrameWorkComponentIframeInspector/TestFrameWorkComponentIframeInspector.ts'
import { createMockRpcWithInvocations } from './test-utils.ts'

const setup = () => {
  return createMockRpcWithInvocations(async (method: string, ...args: readonly any[]) => {
    return undefined
  })
}

test('selectIndex', async () => {
  const mockRpc = setup()
  await IframeInspector.selectIndex(2)
  expect(mockRpc.invocations).toEqual([
    ['IframeInspector.selectIndex', 2]
  ])
})

test('focus navigation methods', async () => {
  const mockRpc = setup()
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
