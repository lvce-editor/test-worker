export interface CommentState {
  readonly consumed: number
  readonly inBlockComment: boolean
  readonly inLineComment: boolean
}

export const consumeComment = (inBlockComment: boolean, inLineComment: boolean, character: string, nextCharacter: string): CommentState => {
  if (inLineComment) {
    if (character === '\n') {
      return {
        consumed: 1,
        inBlockComment,
        inLineComment: false,
      }
    }
    return {
      consumed: 1,
      inBlockComment,
      inLineComment,
    }
  }
  if (inBlockComment) {
    if (character === '*' && nextCharacter === '/') {
      return {
        consumed: 2,
        inBlockComment: false,
        inLineComment,
      }
    }
    return {
      consumed: 1,
      inBlockComment,
      inLineComment,
    }
  }
  if (character === '/' && nextCharacter === '/') {
    return {
      consumed: 2,
      inBlockComment,
      inLineComment: true,
    }
  }
  if (character === '/' && nextCharacter === '*') {
    return {
      consumed: 2,
      inBlockComment: true,
      inLineComment,
    }
  }
  return {
    consumed: 0,
    inBlockComment,
    inLineComment,
  }
}
