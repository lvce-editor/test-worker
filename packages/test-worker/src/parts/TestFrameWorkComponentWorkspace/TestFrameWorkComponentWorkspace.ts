import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TestFrameWorkComponentFileSystem from '../TestFrameWorkComponentFileSystem/TestFrameWorkComponentFileSystem.ts'

/** @deprecated Use setUri instead. */
export const setPath = async (path: string): Promise<void> => {
  await RendererWorker.invoke('Workspace.setPath', path)
}

export const setUri = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('Workspace.setUri', uri)
}

export const openTmpDir = async (): Promise<string> => {
  const tmpDir = await TestFrameWorkComponentFileSystem.getTmpDir()
  await setUri(tmpDir)
  return tmpDir
}

export const close = async (): Promise<void> => {
  await RendererWorker.invoke('Workspace.close')
}
