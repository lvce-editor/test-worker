import { RendererWorker } from '@lvce-editor/rpc-registry'
import { addWebExtension } from '../TestFrameWorkComponentExtension/TestFrameWorkComponentExtension.ts'

export interface GithubApiMock {
  readonly body?: unknown
  readonly headers?: Readonly<Record<string, string>>
  readonly message?: string
  readonly releaseCount?: number
  readonly status?: number
  readonly statusText?: string
  readonly type: 'generated' | 'invalid-json' | 'network-error' | 'response' | 'success'
}

export const createGithubRelease = (overrides: Readonly<Record<string, unknown>> = {}): Readonly<Record<string, unknown>> => {
  return {
    body: 'Fixed an important bug.',
    html_url: 'https://github.com/test-owner/test-repository/releases/tag/v1.0.0',
    name: 'Version 1.0.0',
    published_at: '2026-01-02T03:04:05Z',
    tag_name: 'v1.0.0',
    ...overrides,
  }
}

export const handleClickCategory = async (categoryId: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionDetail.handleClickCategory', categoryId)
}

export const handleReadmeContextMenu = async (x: number, y: number, nodeName: string, href: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionDetail.handleReadmeContextMenu', x, y, nodeName, href)
}

export const copyReadmeLink = async (href: string): Promise<void> => {
  await RendererWorker.invoke('ExtensionDetail.copyReadmeLink', href)
}

export const handleClickEnable = async (): Promise<void> => {
  await RendererWorker.invoke('ExtensionDetail.handleClickEnable')
}

export const handleClickDisable = async (): Promise<void> => {
  await RendererWorker.invoke('ExtensionDetail.handleClickDisable')
}

export const handleClickSetColorTheme = async (): Promise<void> => {
  await RendererWorker.invoke('ExtensionDetail.handleClickSetColorTheme')
}

export const selectFeature = (name: string): Promise<void> => {
  return RendererWorker.invoke('ExtensionDetail.selectFeature', name)
}

export const selectTab = (name: string): Promise<void> => {
  return RendererWorker.invoke('ExtensionDetail.selectTab', name)
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

export const focusNextTab = async (): Promise<void> => {
  await RendererWorker.invoke('ExtensionDetail.focusNextTab')
}

export const focusPreviousTab = async (): Promise<void> => {
  await RendererWorker.invoke('ExtensionDetail.focusPreviousTab')
}

export const open = (extensionId: string): Promise<void> => {
  const uri = `extension-detail://${extensionId}`
  return RendererWorker.invoke('Main.openUri', uri)
}

export const handleClickUninstall = (): Promise<void> => {
  return RendererWorker.invoke('ExtensionDetail.handleClickUninstall')
}

export const handleImageContextMenu = (x: number, y: number): Promise<void> => {
  return RendererWorker.invoke('ExtensionDetail.handleImageContextMenu', x, y)
}

export const handleMarkdownImageError = (src: string): Promise<void> => {
  return RendererWorker.invoke('ExtensionDetail.handleMarkdownImageError', src)
}

export const openFeature = (featureName: string): Promise<void> => {
  return RendererWorker.invoke('ExtensionDetail.handleFeaturesClick', featureName)
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
  return RendererWorker.invoke('ExtensionDetail.handleScroll', scrollTop)
}

export const hideSizeLink = async (): Promise<void> => {
  return RendererWorker.invoke('ExtensionDetail.hideSizeLink')
}

export const handleTabFocus = async (tabName: string): Promise<void> => {
  return RendererWorker.invoke('ExtensionDetail.handleTabFocus', tabName)
}

export const handleClickSettings = async (x: number, y: number): Promise<void> => {
  await RendererWorker.invoke('ExtensionDetail.handleClickSettings', x, y)
}

export const mockGithubApi = async (options: GithubApiMock): Promise<void> => {
  await RendererWorker.invoke('ExtensionDetail.mockGithubApi', options)
}

export const openGithubChangelog = async (extensionUri: string, extensionId: string, options: GithubApiMock): Promise<void> => {
  await addWebExtension(extensionUri)
  await open(extensionId)
  await mockGithubApi(options)
  await selectChangelog()
}
