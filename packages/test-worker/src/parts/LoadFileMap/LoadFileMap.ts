import type { FileMap } from '../FileMap/FileMap.ts'

export const loadFileMap = async (fileMapUrl: string): Promise<FileMap> => {
  const response = await fetch(fileMapUrl)
  if (!response.ok) {
    throw new Error(`Failed to load filemap.json: ${response.status} ${response.statusText}`)
  }
  // TODO handle json error
  const fileMap: FileMap = await response.json()
  return fileMap
}
