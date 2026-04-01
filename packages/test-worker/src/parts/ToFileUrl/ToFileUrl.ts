export const toFileUrl = (url: string): string => {
  const urlObject = new URL(url)
  const pathName = urlObject.pathname
  if (!pathName.startsWith('/remote')) {
    throw new Error(`url must start with /remote`)
  }
  const rest = pathName.slice('/remote'.length)
  return `file://${rest}`
}
