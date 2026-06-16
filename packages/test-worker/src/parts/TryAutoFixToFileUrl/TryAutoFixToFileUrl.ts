import { getFileUrlFromRemotePath } from '../TryAutoFixGetFileUrlFromRemotePath/TryAutoFixGetFileUrlFromRemotePath.ts'

export const toFileUrl = (url: string, locationHref: string): string | undefined => {
  const parsedUrl = new URL(url, locationHref)
  if (parsedUrl.protocol === 'file:') {
    parsedUrl.hash = ''
    parsedUrl.search = ''
    return parsedUrl.href
  }
  return getFileUrlFromRemotePath(parsedUrl.pathname)
}
