import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'

export const close = async (): Promise<void> => {
  await DirectViewWorker.invoke('Panel', 'Panel.handleClickClose')
}

export const hide = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.hidePanel')
}

export const open = async (id: string): Promise<void> => {
  await RendererWorker.invoke('Layout.showPanel', id)
}

export const openProblems = async (): Promise<void> => {
  await open('Problems')

  await DirectViewWorker.invoke('Panel', 'Panel.selectIndex', 0)
}

export const select = async (name: string): Promise<void> => {
  await DirectViewWorker.invoke('Panel', 'Panel.selectName', name)
}

export const selectIndex = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('Panel', 'Panel.selectIndex', index)
}

export const selectIndexRaw = async (rawIndex: string): Promise<void> => {
  await DirectViewWorker.invoke('Panel', 'Panel.selectIndexRaw', rawIndex)
}

export const toggleView = async (name: string): Promise<void> => {
  await DirectViewWorker.invoke('Panel', 'Panel.toggleView', name)
}

export const maximize = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.maximizePanel')
}

export const unmaximize = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.unmaximizePanel')
}
