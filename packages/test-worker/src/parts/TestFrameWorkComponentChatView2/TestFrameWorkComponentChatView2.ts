import type { ILocator } from '../ILocator/ILocator.ts'
import * as PerformAction from '../PerformAction/PerformAction.ts'
import { Locator } from '../TestFrameWork/TestFrameWork.ts'
import * as Command from '../TestFrameWorkComponentCommand/TestFrameWorkComponentCommand.ts'

const activityToggle = (): ILocator => Locator('button[name="toggle-activity"]')

export const show = async (): Promise<void> => {
  await Command.executeExtensionCommand('chat2.show')
}

export const typeComposer = async (text: string): Promise<void> => {
  await PerformAction.performAction(Locator('textarea[name="composer"]'), 'type', { text })
}

export const submit = async (): Promise<void> => {
  await Command.executeExtensionCommand('chat2.submit')
}

export const activityToggleButton = (): ILocator => activityToggle()

export const expandActivity = async (): Promise<void> => {
  await PerformAction.performAction(activityToggle(), 'click', {
    bubbles: true,
    button: 0,
    cancable: true,
    detail: 1,
  })
}

export const activityItems = (): ILocator => Locator('.ChatActivityItem')
