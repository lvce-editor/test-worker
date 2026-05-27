import { quoteString } from '../TryAutoFixQuoteString/TryAutoFixQuoteString.ts'

const validIdentifierRegex = /^[A-Za-z_$][A-Za-z0-9_$]*$/

export const formatObjectKey = (key: string): string => {
  if (validIdentifierRegex.test(key)) {
    return key
  }
  return quoteString(key)
}
