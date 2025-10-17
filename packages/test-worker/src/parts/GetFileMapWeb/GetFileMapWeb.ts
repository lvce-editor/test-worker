import type { FileMap } from '../FileMap/FileMap.ts'
import { loadFileMap } from '../LoadFileMap/LoadFileMap.ts'

export const getFileMapWeb = async (url: string): Promise<FileMap> => {
  const fileMapUrl = `${url}/fileMap.json`
  const fileMap = await loadFileMap(fileMapUrl)
  return fileMap
}
