import type { FileMap } from '../FileMap/FileMap.ts'

const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export const isValidFileMap = (value: unknown): value is FileMap => {
  if (!isObject(value)) {
    return false
  }

  for (const key in value) {
    if (typeof value[key] !== 'string') {
      return false
    }
  }

  return true
}
