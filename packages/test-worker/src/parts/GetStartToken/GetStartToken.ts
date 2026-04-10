const startTokenRegex = /^[a-z][a-z0-9-]*/

export const getStartToken = (selector: string): string => {
  const match = selector.match(startTokenRegex)
  return match ? match[0] : ''
}
