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

const readAllFiles = (filePaths: readonly string[]): Promise<readonly string[]> => {
  return Promise.all(filePaths.map(RendererWorker.readFile))
}

const createFileMap = (filePaths: readonly string[], contents: readonly string[]): FileMap => {
  const fileMap = Object.create(null)
  for (let i = 0; i < filePaths.length; i++) {
    const relativePaths = filePaths[i].slice(filePaths[0].length + 1)
    fileMap[relativePaths] = contents[i]
  }
  return fileMap
}

export const getFileMapNode = async (url: string): Promise<FileMap> => {
  const fileUrl = toFileUrl(url)
  const allFiles = await getDirents(fileUrl)
  const allContents = await readAllFiles(allFiles)
  const fileMap = createFileMap(allFiles, allContents)
  return fileMap
}
