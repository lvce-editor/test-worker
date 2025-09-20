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

export const resolveFileUrl = (url: string): string => {
  // TODO in web, convert to memfs or fetch url
  // TODO on web: read filemap for that fixture
  // else, use filesystem to read the files
  // TODO covert remote url to file url
  // then set that as workspace path

  return toFileUrl(url)
}
