import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const openIframeInspector = async (): Promise<void> => {
  // @ts-ignore
  return Rpc.invoke('Developer.openIframeInspector')
}

export const openCacheFolder = async (): Promise<void> => {
  // @ts-ignore
  return Rpc.invoke('Developer.openCacheFolder')
}

export const openConfigFolder = async (): Promise<void> => {
  // @ts-ignore
  return Rpc.invoke('Developer.openConfigFolder')
}

export const openLogsFolder = async (): Promise<void> => {
  // @ts-ignore
  return Rpc.invoke('Developer.openLogsFolder')
}

export const openProcessExplorer = async (): Promise<void> => {
  // @ts-ignore
  return Rpc.invoke('Developer.openProcessExplorer')
}

export const reloadColorTheme = async (): Promise<void> => {
  // @ts-ignore
  return Rpc.invoke('Developer.reloadColorTheme')
}

export const reloadIconTheme = async (): Promise<void> => {
  // @ts-ignore
  return Rpc.invoke('Developer.reloadIconTheme')
}

export const toggleDeveloperTools = async (): Promise<void> => {
  // @ts-ignore
  return Rpc.invoke('Developer.toggleDeveloperTools')
}
