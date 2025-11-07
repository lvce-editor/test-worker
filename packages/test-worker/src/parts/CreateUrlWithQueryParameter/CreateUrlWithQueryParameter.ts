export const createUrlWithQueryParameter = (url: string): string => {
  const parsedUrl = new URL(url, location.href)
  parsedUrl.searchParams.set('time', `${Date.now()}`)
  const string = parsedUrl.toString()
  return string
}
