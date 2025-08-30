import { RendererWorker } from '@lvce-editor/rpc-registry'

export const show = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Panel.selectIndex', 0)
}

export const handleFilterInput = async (text: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Problems.handleFilterInput', text)
}

export const copyMessage = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Problems.copyMessage')
}

export const focusIndex = async (index: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Problems.focusIndex', index)
}

export const handleArrowLeft = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Problems.handleArrowLeft')
}

export const handleArrowRight = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Problems.handleArrowRight')
}

export const handleClickAt = async (x: number, y: number): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Problems.handleClickAt', x, y)
}

export const handleIconThemeChange = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Problems.handleIconThemeChange')
}

export const viewAsList = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Problems.viewAsList')
}

export const viewAsTable = async (): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Problems.viewAsTable')
}
