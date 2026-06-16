export const createUrlWithQueryParameter = (url: string, locationHref: string, time: number): string => {
  const parsedUrl = new URL(url, locationHref)
  parsedUrl.searchParams.set('time', String(time))
  const string = parsedUrl.href
  return string
}
