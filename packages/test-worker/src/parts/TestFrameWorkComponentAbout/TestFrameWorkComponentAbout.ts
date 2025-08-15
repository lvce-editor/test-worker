import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const show = async (): Promise<void> => {
  return RendererWorker.invoke('About.showAbout')
}

export const handleClickOk = async (): Promise<void> => {
  return RendererWorker.invoke('About.handleClickOk')
}

export const handleClickClose = async (): Promise<void> => {
  return RendererWorker.invoke('About.handleClickClose')
}

export const handleClickCopy = async (): Promise<void> => {
  return RendererWorker.invoke('About.handleClickCopy')
}

export const focusNext = async (): Promise<void> => {
  return RendererWorker.invoke('About.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  return RendererWorker.invoke('About.focusPrevious')
}
