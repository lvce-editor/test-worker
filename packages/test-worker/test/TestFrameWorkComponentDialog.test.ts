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
  await using dialog = await Dialog.mockConfirm(() => true)
  const id = mockRpc.invocations[0][1] as number
  expect(Dialog.executeMock(id, 'legacy')).toBe(true)
  await dialog.shouldHaveBeenCalledWith('legacy')
  expect(mockRpc.invocations).toEqual([['ConfirmPrompt.mock', expect.any(Number)]])
})

test('options record messages and dispose the mock on scope exit', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.mock'() {},
  })
  let id = 0
  {
    await using dialog = await Dialog.mockConfirm({ mockReturnValue: false })
    id = mockRpc.invocations[0][1] as number
    await expect(dialog.shouldHaveBeenCalledWith('delete?')).rejects.toThrow('received []')
    expect(Dialog.executeMock(id, 'delete?', {})).toBe(false)
    await dialog.shouldHaveBeenCalledWith('delete?')
    await expect(dialog.shouldHaveBeenCalledWith('other')).rejects.toThrow('delete?')
  }
  expect(mockRpc.invocations.at(-1)).toEqual(['ConfirmPrompt.mock', 0])
  expect(() => Dialog.executeMock(id, 'delete?')).toThrow()
})

test('nested mocks restore the previous mock and dispose only once', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.mock'() {},
  })
  await using outer = await Dialog.mockConfirm({ mockReturnValue: true })
  const outerId = mockRpc.invocations[0][1] as number
  const inner = await Dialog.mockConfirm({ mockReturnValue: false })
  await inner[Symbol.asyncDispose]()
  await inner[Symbol.asyncDispose]()
  expect(mockRpc.invocations.at(-1)).toEqual(['ConfirmPrompt.mock', outerId])
  expect(mockRpc.invocations).toHaveLength(3)
  expect(Dialog.executeMock(outerId, 'outer')).toBe(true)
  await outer.shouldHaveBeenCalledWith('outer')
})

test('disposing an older mock leaves the active mock installed', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.mock'() {},
  })
  const outer = await Dialog.mockConfirm({ mockReturnValue: true })
  const inner = await Dialog.mockConfirm({ mockReturnValue: false })
  await outer[Symbol.asyncDispose]()
  expect(mockRpc.invocations).toHaveLength(2)
  await inner[Symbol.asyncDispose]()
  expect(mockRpc.invocations.at(-1)).toEqual(['ConfirmPrompt.mock', 0])
})

test('registration failure removes the callback', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.mock'() {
      throw new Error('registration failed')
    },
  })
  await expect(Dialog.mockConfirm({ mockReturnValue: true })).rejects.toThrow('registration failed')
  const id = mockRpc.invocations[0][1] as number
  expect(() => Dialog.executeMock(id)).toThrow()
})
