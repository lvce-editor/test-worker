import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ILocatorExternal } from '../ILocatorExternal/ILocatorExternal.ts'
import { createLocator } from '../CreateLocator/CreateLocator.ts'

export interface RunningExtension {
  readonly activationEvent: string
  readonly activationTime: number
  readonly icon: string
  readonly id: string
  readonly isolated?: boolean
  readonly name: string
  readonly remoteAuthority?: string
  readonly version: string
  readonly workerName?: string
}

export const show = async (): Promise<void> => {
  await RendererWorker.invoke('Main.openUri', 'running-extensions:///1')
}

export const setExtensions = async (extensions: readonly RunningExtension[]): Promise<void> => {
  await RendererWorker.invoke('RunningExtensions.setExtensions', extensions)
}

export const handleContextMenu = async (index: number, x: number = 0, y: number = 0): Promise<void> => {
  await RendererWorker.invoke('RunningExtensions.handleContextMenu', index, x, y)
}

export const copyId = async (index: number): Promise<void> => {
  await RendererWorker.invoke('RunningExtensions.copyId', index)
}

export const disable = async (index: number): Promise<void> => {
  await RendererWorker.invoke('RunningExtensions.disable', index)
}

export const disableWorkspace = async (index: number): Promise<void> => {
  await RendererWorker.invoke('RunningExtensions.disableWorkspace', index)
}

export const reportIssue = async (index: number): Promise<void> => {
  await RendererWorker.invoke('RunningExtensions.reportIssue', index)
}

export const startProfile = async (): Promise<void> => {
  await RendererWorker.invoke('RunningExtensions.startProfile')
}

export const root = (): ILocatorExternal => {
  return createLocator('.RunningExtensions')
}

export const rows = (): ILocatorExternal => {
  return createLocator('.RunningExtension')
}

export const row = (index: number): ILocatorExternal => {
  return rows().nth(index)
}

export const selectedRow = (index: number): ILocatorExternal => {
  return createLocator(`.RunningExtension.ExtensionActive[data-index="${index}"]`)
}

export const emptyMessage = (): ILocatorExternal => {
  return createLocator('.RunningExtensionsEmpty')
}

export const name = (index: number): ILocatorExternal => {
  return row(index).locator('.RunningExtensionName')
}

export const version = (index: number): ILocatorExternal => {
  return row(index).locator('.RunningExtensionVersion')
}

export const id = (index: number): ILocatorExternal => {
  return row(index).locator('.RunningExtensionId')
}

export const activationTime = (index: number): ILocatorExternal => {
  return row(index).locator('.RunningExtensionActivationTime')
}

export const activationReason = (index: number): ILocatorExternal => {
  return row(index).locator('.RunningExtensionActivationReason')
}

export const remoteAuthority = (index: number): ILocatorExternal => {
  return row(index).locator('.RunningExtensionRemoteAuthority')
}

export const icon = (index: number): ILocatorExternal => {
  return row(index).locator('.RunningExtensionIcon')
}

export const defaultIcon = (index: number): ILocatorExternal => {
  return row(index).locator('.RunningExtensionDefaultIcon')
}

export const select = async (index: number): Promise<void> => {
  await row(index).click()
}
