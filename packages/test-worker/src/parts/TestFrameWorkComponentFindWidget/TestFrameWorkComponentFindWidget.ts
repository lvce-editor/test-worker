import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const focusNext = async (): Promise<void> => {
  await Rpc.invoke('FindWidget.focusNext')
}

export const setValue = async (value: string): Promise<void> => {
  await Rpc.invoke('FindWidget.handleInput', value)
}
