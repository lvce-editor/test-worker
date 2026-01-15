import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Mock from '../src/parts/Mock/Mock.ts'
import * as Dialog from '../src/parts/TestFrameWorkComponentDialog/TestFrameWorkComponentDialog.ts'

test('showSaveFilePicker', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FilePicker.showSaveFilePicker'() {
      return undefined
    },
  })
  await Dialog.showSaveFilePicker()
  expect(mockRpc.invocations).toEqual([['FilePicker.showSaveFilePicker']])
})

test('mockSaveFilePicker registers and forwards id', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FilePicker.mockSaveFilePicker'() {
      return undefined
    },
  })
  await Dialog.mockSaveFilePicker(() => 'test.txt')
  expect(mockRpc.invocations).toEqual([['FilePicker.mockSaveFilePicker', expect.any(Number)]])
})

test('executeMock returns value', () => {
  const id = Mock.registerMock(() => 'ok')
  const result = Dialog.executeMock(id)
  expect(result).toBe('ok')
})

test('mockConfirm registers and forwards id', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.mock'() {
      return undefined
    },
  })
  await Dialog.mockConfirm(() => true)
  expect(mockRpc.invocations).toEqual([['ConfirmPrompt.mock', expect.any(Number)]])
})
