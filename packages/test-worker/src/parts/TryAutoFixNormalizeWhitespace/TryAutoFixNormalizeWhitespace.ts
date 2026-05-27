const whitespaceRegex = /\s+/g
const trailingCommaRegex = /,([}\]])/g

export const normalizeWhitespace = (value: string): string => {
  return value.replaceAll(whitespaceRegex, '').replaceAll(trailingCommaRegex, '$1')
}
