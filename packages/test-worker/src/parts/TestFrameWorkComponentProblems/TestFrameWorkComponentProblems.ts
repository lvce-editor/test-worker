import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as InputSource from '../InputSource/InputSource.ts'

export const show = async (): Promise<void> => {
  await RendererWorker.invoke('Panel.selectIndex', 0)
}

export const handleActiveEditorChange = async (activeUri: string): Promise<void> => {
  await RendererWorker.invoke('Problems.handleActiveEditorChange', activeUri)
}

export const handleBlur = async (): Promise<void> => {
  await RendererWorker.invoke('Problems.handleBlur')
}

export const handleClickMoreFilters = async (eventX: number, eventY: number): Promise<void> => {
  await RendererWorker.invoke('Problems.handleClickMoreFilters', eventX, eventY)
}

export const handleContextMenu = async (eventX: number, eventY: number): Promise<void> => {
  await RendererWorker.invoke('Problems.handleContextMenu', eventX, eventY)
}

export const handleFilterInput = async (text: string): Promise<void> => {
  await RendererWorker.invoke('Problems.handleFilterInput', text, InputSource.Script)
}

export const copyMessage = async (): Promise<void> => {
  await RendererWorker.invoke('Problems.copyMessage')
}

export const focusIndex = async (index: number): Promise<void> => {
  await RendererWorker.invoke('Problems.focusIndex', index)
}

export const handleArrowLeft = async (): Promise<void> => {
  await RendererWorker.invoke('Problems.handleArrowLeft')
}

export const handleArrowRight = async (): Promise<void> => {
  await RendererWorker.invoke('Problems.handleArrowRight')
}

export const handleClickAt = async (x: number, y: number): Promise<void> => {
  await RendererWorker.invoke('Problems.handleClickAt', x, y)
}

export const handleIconThemeChange = async (): Promise<void> => {
  await RendererWorker.invoke('Problems.handleIconThemeChange')
}

export const viewAsList = async (): Promise<void> => {
  await RendererWorker.invoke('Problems.viewAsList')
}

export const viewAsTable = async (): Promise<void> => {
  await RendererWorker.invoke('Problems.viewAsTable')
}
