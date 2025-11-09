export const getFileUri = (href: string): string => {
  const rest = href.slice('/remote'.length)
  const fileUrl = `file://${rest}`
  return fileUrl
}
