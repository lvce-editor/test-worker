import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Command from '../TestFrameWorkComponentCommand/TestFrameWorkComponentCommand.ts'

export const showSideBar = async (): Promise<void> => {
  await Command.execute('Layout.showSideBar')
}

export const hideSideBar = async (): Promise<void> => {
  await Command.execute('Layout.hideSideBar')
}

export const getSideBarVisible = async (): Promise<boolean> => {
  return Command.execute('Layout.getSideBarVisible')
}

export const waitForSideBarVisible = async (expected: boolean): Promise<void> => {
  for (let i = 0; i < 20; i++) {
    const sideBarVisible = await getSideBarVisible()
    if (sideBarVisible === expected) {
      return
    }
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
  const sideBarVisible = await getSideBarVisible()
  throw new Error(`expected sidebar visibility to be ${expected} but was ${sideBarVisible}`)
}

export const getSideBarPosition = async (): Promise<number> => {
  return Command.execute('Layout.getSideBarPosition')
}

export const showSecondarySideBar = async (): Promise<void> => {
  await Command.execute('Layout.showSecondarySideBar')
}

export const hideSecondarySideBar = async (): Promise<void> => {
  await Command.execute('Layout.hideSecondarySideBar')
}

export const handleWorkspaceRefresh = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.handleWorkspaceRefresh')
}
