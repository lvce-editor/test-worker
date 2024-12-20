import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const show = async () => {
  return Rpc.invoke('About.showAbout')
}

export const handleClickOk = async () => {
  return Rpc.invoke('About.handleClickOk')
}

export const handleClickClose = async () => {
  return Rpc.invoke('About.handleClickClose')
}

export const handleClickCopy = async () => {
  return Rpc.invoke('About.handleClickCopy')
}

export const focusNext = async () => {
  return Rpc.invoke('About.focusNext')
}

export const focusPrevious = async () => {
  return Rpc.invoke('About.focusPrevious')
}
