import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const focusNext = async (): Promise<void> => {
  await RendererWorker.invoke('FindWidget.focusNext')
}

export const setValue = async (value: string): Promise<void> => {
  await RendererWorker.invoke('FindWidget.handleInput', value)
}
