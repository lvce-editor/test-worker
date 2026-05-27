import { formatObjectKey } from '../TryAutoFixFormatObjectKey/TryAutoFixFormatObjectKey.ts'
import { isObject } from '../TryAutoFixIsObject/TryAutoFixIsObject.ts'
import { quoteString } from '../TryAutoFixQuoteString/TryAutoFixQuoteString.ts'

export const trySerialize = (value: unknown, indent = 0): string | undefined => {
  try {
    if (value === null) {
      return 'null'
    }
    if (typeof value === 'string') {
      return quoteString(value)
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      return JSON.stringify(value)
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return '[]'
      }
      const nextIndent = indent + 2
      const serializedItems = value.map((item) => `${' '.repeat(nextIndent)}${trySerialize(item, nextIndent)}`)
      return `[
${serializedItems.join(',\n')}
${' '.repeat(indent)}]`
    }
    if (isObject(value)) {
      const entries = Object.entries(value)
      if (entries.length === 0) {
        return '{}'
      }
      const nextIndent = indent + 2
      const serializedEntries = []
      for (const entry of entries) {
        const [key, item] = entry
        serializedEntries.push(`${' '.repeat(nextIndent)}${formatObjectKey(key)}: ${trySerialize(item, nextIndent)}`)
      }
      return `{
${serializedEntries.join(',\n')}
${' '.repeat(indent)}}`
    }
    return undefined
  } catch {
    return undefined
  }
}
