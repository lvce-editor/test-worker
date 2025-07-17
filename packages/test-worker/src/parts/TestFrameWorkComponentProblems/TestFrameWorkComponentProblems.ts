import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const show = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Panel.selectIndex', 0)
}

export const handleFilterInput = async (text: string): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Problems.handleFilterInput', text)
}

export const copyMessage = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Problems.copyMessage')
}

export const focusIndex = async (index: number): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Problems.focusIndex', index)
}

export const handleArrowLeft = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Problems.handleArrowLeft')
}

export const handleArrowRight = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Problems.handleArrowRight')
}

export const handleClickAt = async (x: number, y: number): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Problems.handleClickAt', x, y)
}

export const handleIconThemeChange = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Problems.handleIconThemeChange')
}

export const viewAsList = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Problems.viewAsList')
}

export const viewAsTable = async (): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('Problems.viewAsTable')
}
