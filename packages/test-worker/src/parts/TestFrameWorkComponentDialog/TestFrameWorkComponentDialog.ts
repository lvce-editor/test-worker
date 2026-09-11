import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ConfirmMock } from '../ConfirmMock/ConfirmMock.ts'
import type { ConfirmMockOptions } from '../ConfirmMockOptions/ConfirmMockOptions.ts'
import { AssertionError } from '../AssertionError/AssertionError.ts'
import * as Mock from '../Mock/Mock.ts'

export const showSaveFilePicker = async (): Promise<void> => {
  await RendererWorker.invoke('FilePicker.showSaveFilePicker')
}

export const mockSaveFilePicker = async (fn: () => string): Promise<void> => {
  const id = Mock.registerMock(fn)

  await RendererWorker.invoke('FilePicker.mockSaveFilePicker', id)
}

const confirmMocks: number[] = []

export const mockConfirm = async (
  options: ConfirmMockOptions | ((message: string, ...args: readonly unknown[]) => boolean),
): Promise<ConfirmMock> => {
  const messages: unknown[] = []
  const id = Mock.registerMock((message: string, ...args: readonly unknown[]) => {
    messages.push(message)
    return typeof options === 'function' ? options(message, ...args) : options.mockReturnValue
  })
  try {
    await RendererWorker.invoke('ConfirmPrompt.mock', id)
  } catch (error) {
    Mock.unregisterMock(id)
    throw error
  }
  confirmMocks.push(id)
  return {
    async shouldHaveBeenCalledWith(expectedMessage: string): Promise<void> {
      if (!messages.includes(expectedMessage)) {
        throw new AssertionError(`Expected confirm to have been called with ${JSON.stringify(expectedMessage)}, received ${JSON.stringify(messages)}`)
      }
    },
    async [Symbol.asyncDispose](): Promise<void> {
      const index = confirmMocks.indexOf(id)
      if (index === -1) {
        return
      }
      if (index === confirmMocks.length - 1) {
        await RendererWorker.invoke('ConfirmPrompt.mock', confirmMocks[index - 1] ?? 0)
      }
      confirmMocks.splice(index, 1)
      Mock.unregisterMock(id)
    },
  }
}

export const executeMock = (id: number, ...args: readonly any[]): any => {
  return Mock.executeMock(id, ...args)
}
