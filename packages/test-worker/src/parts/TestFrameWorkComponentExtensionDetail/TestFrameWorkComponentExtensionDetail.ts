import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const selectFeature = (name: string): Promise<void> => {
  return Rpc.invoke('ExtensionDetail.selectFeature', name)
}

export const selectTab = (name: string): Promise<void> => {
  return Rpc.invoke('ExtensionDetail.selectTab', name)
}

export const selectDetails = async (): Promise<void> => {
  await selectTab('Details')
}

export const selectFeatures = async (): Promise<void> => {
  await selectTab('Features')
}

export const selectChangelog = async (): Promise<void> => {
  await selectTab('Changelog')
}

export const open = (extensionId: string): Promise<void> => {
  const uri = `extension-detail://${extensionId}`
  return Rpc.invoke('Main.openUri', uri)
}

export const openFeature = (featureName: string): Promise<void> => {
  // @ts-ignore
  return Rpc.invoke('ExtensionDetail.handleFeaturesClick', featureName)
}

export const openThemes = async (): Promise<void> => {
  await openFeature('Theme')
}

export const openCommands = async (): Promise<void> => {
  await openFeature('Commands')
}

export const openWebViews = async (): Promise<void> => {
  await openFeature('WebView')
}

export const openRuntimeStatus = async (): Promise<void> => {
  await openFeature('RuntimeStatus')
}

export const openJsonValidation = async (): Promise<void> => {
  await openFeature('JsonValidation')
}

export const openSettings = async (): Promise<void> => {
  await openFeature('Settings')
}

export const handleScroll = async (scrollTop: number): Promise<void> => {
  // @ts-ignore
  return Rpc.invoke('ExtensionDetail.handleScroll', scrollTop)
}
