import { expect, Locator } from '../TestFrameWork/TestFrameWork.ts'
import * as ActivityBar from '../TestFrameWorkComponentActivityBar/TestFrameworkComponentActivityBar.ts'
import * as Extension from '../TestFrameWorkComponentExtension/TestFrameWorkComponentExtension.ts'
import * as QuickPick from '../TestFrameWorkComponentQuickPick/TestFrameWorkComponentQuickPick.ts'

const extensionId = 'lvce.wsl'
const connectCommand = 'WSL: Connect to WSL'

export const enableExtension = async (): Promise<void> => {
  await Extension.enableWorkspace(extensionId)
  await ActivityBar.handleExtensionsChanged()
}

export const shouldHaveConnectCommand = async (): Promise<void> => {
  await QuickPick.open()
  await QuickPick.setValue(`>${connectCommand}`)
  const command = Locator('.QuickPickItem', { hasText: connectCommand })
  await expect(command).toBeVisible()
}

export const connect = async (): Promise<void> => {
  await shouldHaveConnectCommand()
  await QuickPick.selectItem(connectCommand)
}
