import { RendererWorker as Rpc } from '@lvce-editor/rpc-registry'

export const selectIndex = async (index: number): Promise<void> => {
  return Rpc.invoke('IframeInspector.selectIndex', index)
}

export const focusNext = async (): Promise<void> => {
  return Rpc.invoke('IframeInspector.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  return Rpc.invoke('IframeInspector.focusPrevious')
}

export const focusFirst = async (): Promise<void> => {
  return Rpc.invoke('IframeInspector.focusFirst')
}

export const focusLast = async (): Promise<void> => {
  return Rpc.invoke('IframeInspector.focusLast')
}
