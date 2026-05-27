import { findShouldHavePayloadMatches } from '../TryAutoFixFindShouldHavePayloadMatches/TryAutoFixFindShouldHavePayloadMatches.ts'
import { normalizeWhitespace } from '../TryAutoFixNormalizeWhitespace/TryAutoFixNormalizeWhitespace.ts'
import { projectActualOntoExpected } from '../TryAutoFixProjectActualOntoExpected/TryAutoFixProjectActualOntoExpected.ts'
import { replaceMatch } from '../TryAutoFixReplaceMatch/TryAutoFixReplaceMatch.ts'
import { trySerialize } from '../TryAutoFixTrySerialize/TryAutoFixTrySerialize.ts'

export const replaceShouldHavePayload = (fileContent: string, expectedPayload: unknown, actualPayload: unknown): string | undefined => {
  const minimalPayload = projectActualOntoExpected(actualPayload, expectedPayload)
  const serializedMinimalPayload = trySerialize(minimalPayload)
  if (!serializedMinimalPayload) {
    return undefined
  }
  const matches = findShouldHavePayloadMatches(fileContent)
  if (matches.length === 0) {
    return undefined
  }
  if (matches.length === 1) {
    const [match] = matches
    return replaceMatch(fileContent, match.index, match.length, `shouldHavePayload(${serializedMinimalPayload})`)
  }
  const serializedExpected = trySerialize(expectedPayload)
  if (!serializedExpected) {
    return undefined
  }
  const normalizedExpected = normalizeWhitespace(serializedExpected)
  const matchingCandidates = []
  for (const match of matches) {
    if (normalizeWhitespace(match.argument) === normalizedExpected) {
      matchingCandidates.push(match)
    }
  }
  if (matchingCandidates.length !== 1) {
    return undefined
  }
  const [candidate] = matchingCandidates
  return replaceMatch(fileContent, candidate.index, candidate.length, `shouldHavePayload(${serializedMinimalPayload})`)
}
