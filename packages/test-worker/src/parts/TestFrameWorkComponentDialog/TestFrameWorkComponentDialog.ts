import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Mock from '../Mock/Mock.ts'

export const showSaveFilePicker = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('FilePicker.showSaveFilePicker')
}

export const mockSaveFilePicker = async (fn: () => string): Promise<void> => {
  const id = Mock.registerMock(fn)
  // @ts-ignore
  await RendererWorker.invoke('FilePicker.mockSaveFilePicker', id)
}

export const mockConfirm = async (fn: () => boolean): Promise<void> => {
  const id = Mock.registerMock(fn)
  // @ts-ignore
  await RendererWorker.invoke('ConfirmPrompt.mock', id)
}

export const executeMock = (id: number): string => {
  return Mock.executeMock(id)
}
