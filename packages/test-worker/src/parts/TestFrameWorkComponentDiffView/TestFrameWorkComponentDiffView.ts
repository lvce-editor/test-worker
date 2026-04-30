import { createLocator } from '../CreateLocator/CreateLocator.ts'
import { expect } from '../Expect/Expect.ts'
import * as Main from '../TestFrameWorkComponentMain/TestFrameWorkComponentMain.ts'

export const open = async (leftUri: string, rightUri: string): Promise<void> => {
  await Main.openUri(`diff://${leftUri}<->${rightUri}`)
}

export const shouldHaveContentLeft = async (expectedContent: string): Promise<void> => {
  const contentLeft = createLocator('.DiffEditorContentLeft')
  await expect(contentLeft).toHaveText(expectedContent)
}
export const shouldHaveContentRight = async (expectedContent: string): Promise<void> => {
  const contentRight = createLocator('.DiffEditorContentRight')
  await expect(contentRight).toHaveText(expectedContent)
}
