import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const show = async (): Promise<void> => {
  return Rpc.invoke('About.showAbout')
}

export const handleClickOk = async (): Promise<void> => {
  return Rpc.invoke('About.handleClickOk')
}

export const handleClickClose = async (): Promise<void> => {
  return Rpc.invoke('About.handleClickClose')
}

export const handleClickCopy = async (): Promise<void> => {
  return Rpc.invoke('About.handleClickCopy')
}

export const focusNext = async (): Promise<void> => {
  return Rpc.invoke('About.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  return Rpc.invoke('About.focusPrevious')
}
