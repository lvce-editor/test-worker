import { findClosingParenthesis } from '../TryAutoFixFindClosingParenthesis/TryAutoFixFindClosingParenthesis.ts'

const shouldHavePayloadSearch = 'shouldHavePayload('

export interface ShouldHavePayloadMatch {
  readonly argument: string
  readonly index: number
  readonly length: number
}

export const findShouldHavePayloadMatches = (fileContent: string): readonly ShouldHavePayloadMatch[] => {
  const matches: ShouldHavePayloadMatch[] = []
  let searchIndex = 0
  while (searchIndex < fileContent.length) {
    const matchIndex = fileContent.indexOf(shouldHavePayloadSearch, searchIndex)
    if (matchIndex === -1) {
      break
    }
    const argumentStart = matchIndex + shouldHavePayloadSearch.length
    const closingParenthesisIndex = findClosingParenthesis(fileContent, argumentStart)
    if (closingParenthesisIndex === -1) {
      break
    }
    matches.push({
      argument: fileContent.slice(argumentStart, closingParenthesisIndex),
      index: matchIndex,
      length: closingParenthesisIndex - matchIndex + 1,
    })
    searchIndex = closingParenthesisIndex + 1
  }
  return matches
}