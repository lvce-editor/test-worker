import { isStringDelimiter } from '../TryAutoFixIsStringDelimiter/TryAutoFixIsStringDelimiter.ts'

export interface StringState {
  readonly consumed: number
  readonly stringDelimiter: string
}

export const consumeString = (stringDelimiter: string, character: string): StringState => {
  if (!stringDelimiter) {
    if (isStringDelimiter(character)) {
      return {
        consumed: 1,
        stringDelimiter: character,
      }
    }
    return {
      consumed: 0,
      stringDelimiter,
    }
  }
  if (character === '\\') {
    return {
      consumed: 2,
      stringDelimiter,
    }
  }
  if (character === stringDelimiter) {
    return {
      consumed: 1,
      stringDelimiter: '',
    }
  }
  return {
    consumed: 1,
    stringDelimiter,
  }
}