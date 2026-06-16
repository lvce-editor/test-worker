let url = ''

export const setUrl = (newUrl: string): void => {
  url = newUrl
}

export const resolve = (relativePath: string): string => {
  const resolvedUrl = new URL(relativePath, url)
  return resolvedUrl.href
}
