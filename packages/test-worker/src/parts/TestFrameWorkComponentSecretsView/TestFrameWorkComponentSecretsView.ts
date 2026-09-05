import type { ILocatorExternal } from '../ILocatorExternal/ILocatorExternal.ts'
import { createLocator } from '../CreateLocator/CreateLocator.ts'
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

export const edit = async (_index?: number): Promise<void> => {
  await root().locator('[name="edit"]').click()
}

export const save = async (_index?: number): Promise<void> => {
  await root().locator('[name="save"]').click()
}

export const cancel = async (_index?: number): Promise<void> => {
  await root().locator('[name="cancel"]').click()
}

export const toggleReveal = async (index: number): Promise<void> => {
  await row(index).locator(`[name="reveal:${index}"]`).click()
}

export const copy = async (index: number): Promise<void> => {
  await row(index).locator(`[name="copy:${index}"]`).click()
}

export const deleteSecret = async (index: number): Promise<void> => {
  await row(index).locator(`[name="delete:${index}"]`).click()
}
