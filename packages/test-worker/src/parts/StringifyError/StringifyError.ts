export const stringifyError = (error: any): string => {
  if (!error) {
    return `${error}`
  }
  if (error && error.message && error.constructor.name && error.constructor.name !== 'Error' && error.constructor.name !== 'VError') {
    return `${error}`
  }
  return `${error.message}`
}
