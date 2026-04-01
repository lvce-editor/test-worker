import type { FileMap } from '../FileMap/FileMap.ts'
import { isValidFileMap } from '../IsValidFileMap/IsValidFileMap.ts'
import { VError } from '../VError/VError.ts'

export const loadFileMap = async (fileMapUrl: string): Promise<FileMap> => {
  try {
    const response = await fetch(fileMapUrl)
    if (!response.ok) {
      throw new Error(`Failed to load filemap.json: ${response.status} ${response.statusText}`)
    }
    const parsedJson = await response.json()

    if (!isValidFileMap(parsedJson)) {
      throw new Error('Invalid file map format: expected an object with string values')
    }

    return parsedJson
  } catch (error) {
    throw new VError(error, `Failed to load file map from ${fileMapUrl}`)
  }
}
