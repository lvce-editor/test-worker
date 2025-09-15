import { expect, test } from '@jest/globals'
import * as Mock from '../src/parts/Mock/Mock.ts'
import * as Dialog from '../src/parts/TestFrameWorkComponentDialog/TestFrameWorkComponentDialog.ts'
import { createMockRpcWithInvocations } from './test-utils.ts'

const setup = () => {
  return createMockRpcWithInvocations(async (method: string, ...args: readonly any[]) => {
    return undefined
  })
}

test('showSaveFilePicker', async () => {
  const mockRpc = setup()
  await Dialog.showSaveFilePicker()
  expect(mockRpc.invocations).toEqual([
    ['FilePicker.showSaveFilePicker']
  ])
})

test('mockSaveFilePicker registers and forwards id', async () => {
  const mockRpc = setup()
  await Dialog.mockSaveFilePicker(() => 'test.txt')
  expect(mockRpc.invocations).toEqual([
    ['FilePicker.mockSaveFilePicker', expect.any(Number)]
  ])
})

test('executeMock returns value', () => {
  const id = Mock.registerMock(() => 'ok')
  const result = Dialog.executeMock(id)
  expect(result).toBe('ok')
})
