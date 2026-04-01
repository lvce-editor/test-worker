export const string = (value: any, message: string): void => {
  if (typeof value !== 'string') {
    throw new TypeError(message)
  }
}

export const number = (value: any, message: string): void => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new TypeError(message)
  }
}
