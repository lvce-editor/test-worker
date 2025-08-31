import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Dialog from '../src/parts/TestFrameWorkComponentDialog/TestFrameWorkComponentDialog.ts'
import * as Mock from '../src/parts/Mock/Mock.ts'

const setup = () => {
  const invoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke })
  RendererWorker.set(mockRpc)
  return invoke
}

test('showSaveFilePicker', async () => {
  const invoke = setup()
  await Dialog.showSaveFilePicker()
  expect(invoke).toHaveBeenCalledWith('FilePicker.showSaveFilePicker')
})

test('mockSaveFilePicker registers and forwards id', async () => {
  const invoke = setup()
  await Dialog.mockSaveFilePicker(() => 'test.txt')
  expect(invoke).toHaveBeenCalledWith('FilePicker.mockSaveFilePicker', expect.any(Number))
})

test('executeMock returns value', () => {
  const id = Mock.registerMock(() => 'ok')
  const result = Dialog.executeMock(id)
  expect(result).toBe('ok')
})
