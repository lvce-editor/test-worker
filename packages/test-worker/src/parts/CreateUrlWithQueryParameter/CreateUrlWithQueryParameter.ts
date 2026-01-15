export const createUrlWithQueryParameter = (url: string, locationHref: string = location.href): string => {
  const parsedUrl = new URL(url, locationHref)
  parsedUrl.searchParams.set('time', `${Date.now()}`)
  const string = parsedUrl.toString()
  return string
}
