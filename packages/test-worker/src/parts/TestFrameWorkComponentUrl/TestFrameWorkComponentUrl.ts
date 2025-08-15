let url = ''

export const setUrl = (newUrl: string): void => {
  url = newUrl
}

export const resolve = (relativePath: string): string => {
  return new URL(relativePath, url).toString()
}
