export const stringifyError = (error: any): string => {
  if (!error) {
    return String(error)
  }
  if (error && error.message && error.constructor.name && error.constructor.name !== 'Error' && error.constructor.name !== 'VError') {
    return String(error)
  }
  return String(error.message)
}
