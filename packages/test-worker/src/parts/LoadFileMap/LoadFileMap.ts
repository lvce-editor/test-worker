import type { FileMap } from '../FileMap/FileMap.ts'

export const loadFileMap = async (): Promise<FileMap> => {
  const response = await fetch('/filemap.json')
  if (!response.ok) {
    throw new Error(`Failed to load filemap.json: ${response.status} ${response.statusText}`)
  }
  const fileMap: FileMap = await response.json()
  return fileMap
}
