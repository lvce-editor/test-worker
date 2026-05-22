export const isStringDelimiter = (character: string): boolean => {
  return character === "'" || character === '"' || character === '`'
}