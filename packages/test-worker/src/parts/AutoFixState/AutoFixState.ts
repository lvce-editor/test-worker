import type { AutoFixError } from '../AutoFixError/AutoFixError.ts'

const state: { autoFixError: AutoFixError | undefined } = {
  autoFixError: undefined,
}

export const get = (): AutoFixError | undefined => {
  return state.autoFixError
}

export const set = (value: AutoFixError | undefined): void => {
  state.autoFixError = value
}

export const clear = (): void => {
  state.autoFixError = undefined
}
