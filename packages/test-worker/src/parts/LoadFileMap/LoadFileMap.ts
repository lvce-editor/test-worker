import type { FileMap } from '../FileMap/FileMap.ts'
import { VError } from '../VError/VError.ts'

export const loadFileMap = async (fileMapUrl: string): Promise<FileMap> => {
  try {
    const response = await fetch(fileMapUrl)
    if (!response.ok) {
      throw new Error(`Failed to load filemap.json: ${response.status} ${response.statusText}`)
    }
    const fileMap: FileMap = await response.json()
    return fileMap
  } catch (error) {
    throw new VError(error, `Failed to load file map from ${fileMapUrl}`)
  }
}
