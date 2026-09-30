import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ILocatorExternal } from '../ILocatorExternal/ILocatorExternal.ts'
import { createLocator } from '../CreateLocator/CreateLocator.ts'
import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'

export const open = async (): Promise<void> => {
  await RendererWorker.invoke('Main.openUri', 'workers:///1')
}

export const refresh = async (): Promise<void> => {
  await DirectViewWorker.invoke('Workers', 'Workers.refresh')
}

export const autoRefresh = async (): Promise<void> => {
  await DirectViewWorker.invoke('Workers', 'Workers.autoRefresh')
}

export const resize = async (width: number, height: number): Promise<void> => {
  await DirectViewWorker.invoke('Workers', 'Workers.resize', width, height)
}

export const setError = async (error: Error): Promise<void> => {
  await DirectViewWorker.invoke('Workers', 'Workers.setError', error)
}

export const root = (): ILocatorExternal => createLocator('.WorkersView')

export const heading = (): ILocatorExternal => root().locator('h1')

export const table = (): ILocatorExternal => root().locator('[role="table"][aria-label="Workers"]')

export const error = (): ILocatorExternal => root().locator('[role="alert"]')

export const headerCell = (index: number): ILocatorExternal => root().locator('.WorkersViewTableHeaderCell').nth(index)

export const nameHeader = (): ILocatorExternal => headerCell(0)

export const memoryHeader = (): ILocatorExternal => headerCell(1)

export const headerButton = (index: number): ILocatorExternal => root().locator('.WorkersViewTableHeaderButton').nth(index)

export const nameHeaderButton = (): ILocatorExternal => headerButton(0)

export const memoryHeaderButton = (): ILocatorExternal => headerButton(1)
