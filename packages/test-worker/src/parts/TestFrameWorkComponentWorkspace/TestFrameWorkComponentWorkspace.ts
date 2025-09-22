import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as TestFrameWorkComponentFileSystem from '../TestFrameWorkComponentFileSystem/TestFrameWorkComponentFileSystem.ts'
import { toFileUrl } from '../ToFileUrl/ToFileUrl.ts'

export const setPath = async (path: string): Promise<void> => {
  await RendererWorker.invoke('Workspace.setPath', path)
}

export const openTmpDir = async (): Promise<string> => {
  const tmpDir = await TestFrameWorkComponentFileSystem.getTmpDir()
  await setPath(tmpDir)
  return tmpDir
}

/**
 * @deprecated use FileSystem.loadFixture instead
 */
export const resolveFileUrl = (url: string): string => {
  // TODO covert remote url to file url
  // then set that as workspace path
  return toFileUrl(url)
}
