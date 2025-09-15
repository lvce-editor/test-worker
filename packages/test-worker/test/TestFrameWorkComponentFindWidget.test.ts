import { expect, test } from '@jest/globals'
import * as FindWidget from '../src/parts/TestFrameWorkComponentFindWidget/TestFrameWorkComponentFindWidget.ts'
import { createMockRpcWithInvocations } from './test-utils.ts'

test('focusNext', async () => {
  const mockRpc = createMockRpcWithInvocations(async (method: string, ...args: readonly any[]) => {
    return undefined
  })

  await FindWidget.focusNext()

  expect(mockRpc.invocations).toEqual([
    ['FindWidget.focusNext']
  ])
})

test('setValue', async () => {
  const mockRpc = createMockRpcWithInvocations(async (method: string, ...args: readonly any[]) => {
    return undefined
  })

  await FindWidget.setValue('hello')

  expect(mockRpc.invocations).toEqual([
    ['FindWidget.handleInput', 'hello', 2]
  ])
})
