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

export const root = (): ILocatorExternal => createLocator('.workers-view')

export const heading = (): ILocatorExternal => root().locator('h1')

export const table = (): ILocatorExternal => root().locator('[role="table"][aria-label="Workers"]')

export const refreshButton = (): ILocatorExternal => root().locator('button')
