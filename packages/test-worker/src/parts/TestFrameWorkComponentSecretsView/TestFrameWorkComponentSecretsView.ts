import { createLocator } from '../CreateLocator/CreateLocator.ts'
import type { ILocatorExternal } from '../ILocatorExternal/ILocatorExternal.ts'
import * as DirectViewWorker from '../DirectViewWorker/DirectViewWorker.ts'

export interface SecretData {
  readonly extensionId: string
  readonly key: string
  readonly value?: string
}

export const show = async (): Promise<void> => {
  await DirectViewWorker.invoke('MainArea', 'Main.openUri', 'secrets://')
}

export const setData = async (secrets: readonly SecretData[]): Promise<void> => {
  await DirectViewWorker.invoke('SecretsView', 'SecretsView.setData', secrets)
}

export const root = (): ILocatorExternal => createLocator('.SecretsView')

export const rows = (): ILocatorExternal => createLocator('.SecretsViewRow')

export const row = (index: number): ILocatorExternal => rows().nth(index)

export const extensionId = (index: number): ILocatorExternal => row(index).locator('.SecretsViewExtensionId')

export const key = (index: number): ILocatorExternal => row(index).locator('.SecretsViewKey')

export const value = (index: number): ILocatorExternal => row(index).locator('.SecretsViewValue')

export const edit = async (index: number): Promise<void> => {
  await row(index).locator('[aria-label="Edit"]').click()
}

export const save = async (index: number): Promise<void> => {
  await row(index).locator('[aria-label="Save"]').click()
}

export const cancel = async (index: number): Promise<void> => {
  await row(index).locator('[aria-label="Cancel"]').click()
}
