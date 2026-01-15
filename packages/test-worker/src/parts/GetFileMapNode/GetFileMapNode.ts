import { DirentType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { FileMap } from '../FileMap/FileMap.ts'
import { toFileUrl } from '../ToFileUrl/ToFileUrl.ts'

const getDirents = async (fileUrl: string): Promise<readonly string[]> => {
  const allDirents: string[] = []
  const dirents = await RendererWorker.invoke('FileSystem.readDirWithFileTypes', fileUrl)
  for (const dirent of dirents) {
    if (dirent.type === DirentType.Directory) {
      const subDirents = await getDirents(`${fileUrl}/${dirent.name}`)
      allDirents.push(...subDirents)
    } else {
      allDirents.push(`${fileUrl}/${dirent.name}`)
    }
  }
  return allDirents
}

export const getFileMapNode = async (url: string): Promise<FileMap> => {
  const fileUrl = toFileUrl(url)
  const allFiles = await getDirents(fileUrl)
  const fileMap = Object.create(null)
  for (const filePath of allFiles) {
    const content = await RendererWorker.invoke(`FileSystem.readFile`, filePath)
    const relativePaths = filePath.slice(fileUrl.length + 1)
    fileMap[relativePaths] = content
  }
  return fileMap
}
