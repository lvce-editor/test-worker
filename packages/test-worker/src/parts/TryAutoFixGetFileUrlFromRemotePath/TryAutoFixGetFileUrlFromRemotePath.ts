export const getFileUrlFromRemotePath = (rawPathName: string): string | undefined => {
  if (!rawPathName.startsWith('/remote')) {
    return undefined
  }
  const rest = rawPathName.slice('/remote'.length)
  return `file://${rest}`
}
