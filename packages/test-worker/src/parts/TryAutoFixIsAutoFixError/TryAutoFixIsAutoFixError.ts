import type { AutoFixError } from '../AutoFixError/AutoFixError.ts'

export const isAutoFixError = (value: AutoFixError | undefined): value is AutoFixError => {
  if (!value) {
    return false
  }
  return value.code === 'chat-debug.should-have-payload'
}