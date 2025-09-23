import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TestFrameWorkComponentFileSystem from '../TestFrameWorkComponentFileSystem/TestFrameWorkComponentFileSystem.ts'

export const setPath = async (path: string): Promise<void> => {
  await RendererWorker.invoke('Workspace.setPath', path)
}

export const openTmpDir = async (): Promise<string> => {
  const tmpDir = await TestFrameWorkComponentFileSystem.getTmpDir()
  await setPath(tmpDir)
  return tmpDir
}
