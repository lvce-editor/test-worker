/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { DirentType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { FileMap } from '../FileMap/FileMap.ts'
import { toFileUrl } from '../ToFileUrl/ToFileUrl.ts'

const getDirents = async (allDirents: string[], fileUrl: string): Promise<void> => {
  const dirents = await RendererWorker.invoke('FileSystem.readDirWithFileTypes', fileUrl)
  for (const dirent of dirents) {
    if (dirent.type === DirentType.Directory) {
      await getDirents(allDirents, `${fileUrl}/${dirent.name}`)
    } else {
      allDirents.push(`${fileUrl}/${dirent.name}`)
    }
  }
}

export const getFileMapNode = async (url: string): Promise<FileMap> => {
  const fileUrl = toFileUrl(url)
  const allFiles: string[] = []
  await getDirents(allFiles, fileUrl)
  const fileMap = Object.create(null)
  for (const filePath of allFiles) {
    const content = await RendererWorker.readFile(filePath)
    const relativePaths = filePath.slice(fileUrl.length + 1)
    fileMap[relativePaths] = content
  }
  return fileMap
}
