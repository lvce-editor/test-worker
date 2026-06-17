const state = {
  url: '',
}

export const setUrl = (newUrl: string): void => {
  state.url = newUrl
}

export const resolve = (relativePath: string): string => {
  const resolvedUrl = new URL(relativePath, state.url)
  return resolvedUrl.href
}
