import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Mock from '../src/parts/Mock/Mock.ts'
import * as Dialog from '../src/parts/TestFrameWorkComponentDialog/TestFrameWorkComponentDialog.ts'

const setup = () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      return undefined
    },
  })
  return mockRpc
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
