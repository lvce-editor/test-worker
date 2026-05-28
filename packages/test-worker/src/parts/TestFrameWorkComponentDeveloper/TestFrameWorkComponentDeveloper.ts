import { RendererWorker } from '@lvce-editor/rpc-registry'

export const openIframeInspector = async (): Promise<void> => {
  return RendererWorker.invoke('Developer.openIframeInspector')
}

export const openCacheFolder = async (): Promise<void> => {
  return RendererWorker.invoke('Developer.openCacheFolder')
}

export const openConfigFolder = async (): Promise<void> => {
  return RendererWorker.invoke('Developer.openConfigFolder')
}

export const openLogsFolder = async (): Promise<void> => {
  return RendererWorker.invoke('Developer.openLogsFolder')
}

export const openProcessExplorer = async (): Promise<void> => {
  return RendererWorker.invoke('Developer.openProcessExplorer')
}

export const reloadColorTheme = async (): Promise<void> => {
  return RendererWorker.invoke('Developer.reloadColorTheme')
}

export const reloadIconTheme = async (): Promise<void> => {
  return RendererWorker.invoke('Developer.reloadIconTheme')
}

export const toggleDeveloperTools = async (): Promise<void> => {
  return RendererWorker.invoke('Developer.toggleDeveloperTools')
}
