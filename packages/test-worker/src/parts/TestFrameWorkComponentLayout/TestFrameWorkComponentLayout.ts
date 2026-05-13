import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Command from '../TestFrameWorkComponentCommand/TestFrameWorkComponentCommand.ts'

export const showSideBar = async (): Promise<void> => {
  await Command.execute('Layout.showSideBar')
}

export const hideSideBar = async (): Promise<void> => {
  await Command.execute('Layout.hideSideBar')
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
