import { consumeComment } from '../TryAutoFixConsumeComment/TryAutoFixConsumeComment.ts'
import { consumeString } from '../TryAutoFixConsumeString/TryAutoFixConsumeString.ts'

export const findClosingParenthesis = (fileContent: string, startIndex: number): number => {
  let depth = 1
  let inBlockComment = false
  let inLineComment = false
  let stringDelimiter = ''
  for (let index = startIndex; index < fileContent.length; ) {
    const character = fileContent[index]
    const nextCharacter = fileContent[index + 1]
    const stringState = consumeString(stringDelimiter, character)
    const { consumed: consumedString, stringDelimiter: nextStringDelimiter } = stringState
    stringDelimiter = nextStringDelimiter
    if (consumedString > 0) {
      index += consumedString
      continue
    }
    const commentState = consumeComment(inBlockComment, inLineComment, character, nextCharacter)
    const { consumed: consumedComment, inBlockComment: nextInBlockComment, inLineComment: nextInLineComment } = commentState
    inBlockComment = nextInBlockComment
    inLineComment = nextInLineComment
    if (consumedComment > 0) {
      index += consumedComment
      continue
    }
    if (character === '(') {
      depth++
      index++
      continue
    }
    if (character === ')') {
      depth--
      if (depth === 0) {
        return index
      }
    }
    index++
  }
  return -1
}