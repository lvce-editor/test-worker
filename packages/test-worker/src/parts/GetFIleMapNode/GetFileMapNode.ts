/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { DirentType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { FileMap } from '../FileMap/FileMap.ts'
import { loadFileMap } from '../LoadFileMap/LoadFileMap.ts'
import { toFileUrl } from '../ToFileUrl/ToFileUrl.ts'

const getDirents = async (allDirents: string[], fileUrl: string) => {
  const dirents = await RendererWorker.invoke('FileSystem.readDirWithFileTypes', fileUrl)
  for (const dirent of dirents) {
    allDirents.push(`${dirent.name}`)
  }
  for (const dirent of dirents) {
    if (dirent.type === DirentType.Directory) {
      await getDirents(allDirents, `${fileUrl}/${dirent.name}`)
    }
  }
}

export const getFileMapNode = async (url: string): Promise<FileMap> => {
  const fileUrl = toFileUrl(url)
  const allFiles: string[] = []
  await getDirents(allFiles, fileUrl)
  console.log({ allFiles })
  return {}
}
