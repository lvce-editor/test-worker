export const isStringDelimiter = (character: string): boolean => {
  return [`'`, '"', '`'].includes(character)
}
