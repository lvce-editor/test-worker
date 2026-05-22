export const replaceMatch = (fileContent: string, index: number, length: number, replacement: string): string => {
  const before = fileContent.slice(0, index)
  const after = fileContent.slice(index + length)
  return `${before}${replacement}${after}`
}