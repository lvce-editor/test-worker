import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as Command from '../TestFrameWorkComponentCommand/TestFrameWorkComponentCommand.ts'

export const showSideBar = async (): Promise<void> => {
  await Command.execute('Layout.showSideBar')
}

export const handleWorkspaceRefresh = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.handleWorkspaceRefresh')
}
