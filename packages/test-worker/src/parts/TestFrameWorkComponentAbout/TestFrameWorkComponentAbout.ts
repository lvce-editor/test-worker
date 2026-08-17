import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'

export const show = async (): Promise<void> => {
  return DirectViewWorker.invoke('About', 'About.showAbout')
}

export const handleClickOk = async (): Promise<void> => {
  return DirectViewWorker.invoke('About', 'About.handleClickOk')
}

export const handleClickClose = async (): Promise<void> => {
  return DirectViewWorker.invoke('About', 'About.handleClickClose')
}

export const handleClickCopy = async (): Promise<void> => {
  return DirectViewWorker.invoke('About', 'About.handleClickCopy')
}

export const focusNext = async (): Promise<void> => {
  return DirectViewWorker.invoke('About', 'About.focusNext')
}

export const focusPrevious = async (): Promise<void> => {
  return DirectViewWorker.invoke('About', 'About.focusPrevious')
}
