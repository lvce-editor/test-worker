import type { FileMap } from '../FileMap/FileMap.ts'

const isObject = (value: any): value is object => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export const isValidFileMap = (value: any): value is FileMap => {
  if (!isObject(value)) {
    return false
  }

  // Check that all values are strings
  for (const key in value) {
    if (typeof value[key] !== 'string') {
      return false
    }
  }

  return true
}
