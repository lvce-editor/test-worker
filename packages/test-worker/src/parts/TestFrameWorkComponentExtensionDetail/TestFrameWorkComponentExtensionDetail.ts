import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const selectFeature = (name: string): Promise<void> => {
  return Rpc.invoke('ExtensionDetail.selectFeature', name)
}

export const selectTab = (name: string): Promise<void> => {
  return Rpc.invoke('ExtensionDetail.selectTab', name)
}

export const open = (extensionId: string): Promise<void> => {
  const uri = `extension-detail://${extensionId}`
  return Rpc.invoke('Main.openUri', uri)
}

export const openFeature = (featureName: string): Promise<void> => {
  return Rpc.invoke('ExtensionDetail.handleFeaturesClick', featureName)
}

export const openThemes = async (): Promise<void> => {
  await openFeature('Themes')
}

export const openCommands = async (): Promise<void> => {
  await openFeature('Commands')
}

export const openWebViews = async (): Promise<void> => {
  await openFeature('WebView')
}
