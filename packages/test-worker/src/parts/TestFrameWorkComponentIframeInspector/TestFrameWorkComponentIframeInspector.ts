import { RendererWorker } from '@lvce-editor/rpc-registry'

export const selectIndex = async (index: number): Promise<void> => {
  return RendererWorker.invoke('IframeInspector.selectIndex', index)
}

export const focusNext = async (): Promise<void> => {
  return RendererWorker.invoke('IframeInspector.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  return RendererWorker.invoke('IframeInspector.focusPrevious')
}

export const focusFirst = async (): Promise<void> => {
  return RendererWorker.invoke('IframeInspector.focusFirst')
}

export const focusLast = async (): Promise<void> => {
  return RendererWorker.invoke('IframeInspector.focusLast')
}
