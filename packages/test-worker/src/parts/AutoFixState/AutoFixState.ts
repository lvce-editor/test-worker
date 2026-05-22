import type { AutoFixError } from '../AutoFixError/AutoFixError.ts'

let autoFixError: AutoFixError | undefined

export const get = (): AutoFixError | undefined => {
  return autoFixError
}

export const set = (value: AutoFixError | undefined): void => {
  autoFixError = value
}

export const clear = (): void => {
  autoFixError = undefined
}
