export const createUrlWithQueryParameter = (url: string, locationHref: string, time: number): string => {
  const parsedUrl = new URL(url, locationHref)
  parsedUrl.searchParams.set('time', `${time}`)
  const string = parsedUrl.toString()
  return string
}
