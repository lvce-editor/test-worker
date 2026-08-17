import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const show = async (): Promise<void> => {
  await DirectViewWorker.invoke('Panel', 'Panel.selectIndex', 0)
}

export const handleActiveEditorChange = async (activeUri: string): Promise<void> => {
  await DirectViewWorker.invoke('Problems', 'Problems.handleActiveEditorChange', activeUri)
}

export const handleBlur = async (): Promise<void> => {
  await DirectViewWorker.invoke('Problems', 'Problems.handleBlur')
}

export const handleClickMoreFilters = async (eventX: number, eventY: number): Promise<void> => {
  await DirectViewWorker.invoke('Problems', 'Problems.handleClickMoreFilters', eventX, eventY)
}

export const handleContextMenu = async (eventX: number, eventY: number): Promise<void> => {
  await DirectViewWorker.invoke('Problems', 'Problems.handleContextMenu', eventX, eventY)
}

export const handleFilterInput = async (text: string): Promise<void> => {
  await DirectViewWorker.invoke('Problems', 'Problems.handleFilterInput', text, InputSource.Script)
}

export const copyMessage = async (): Promise<void> => {
  await DirectViewWorker.invoke('Problems', 'Problems.copyMessage')
}

export const focusIndex = async (index: number): Promise<void> => {
  await DirectViewWorker.invoke('Problems', 'Problems.focusIndex', index)
}

export const handleArrowLeft = async (): Promise<void> => {
  await DirectViewWorker.invoke('Problems', 'Problems.handleArrowLeft')
}

export const handleArrowRight = async (): Promise<void> => {
  await DirectViewWorker.invoke('Problems', 'Problems.handleArrowRight')
}

export const handleClickAt = async (x: number, y: number): Promise<void> => {
  await DirectViewWorker.invoke('Problems', 'Problems.handleClickAt', x, y)
}

export const handleIconThemeChange = async (): Promise<void> => {
  await DirectViewWorker.invoke('Problems', 'Problems.handleIconThemeChange')
}

export const viewAsList = async (): Promise<void> => {
  await DirectViewWorker.invoke('Problems', 'Problems.viewAsList')
}

export const viewAsTable = async (): Promise<void> => {
  await DirectViewWorker.invoke('Problems', 'Problems.viewAsTable')
}
