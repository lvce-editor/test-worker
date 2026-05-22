import type { AutoFixError } from '../AutoFixError/AutoFixError.ts'
import type * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'
import * as AutoFixState from '../AutoFixState/AutoFixState.ts'
import { createUrlWithQueryParameter } from '../CreateUrlWithQueryParameter/CreateUrlWithQueryParameter.ts'
import * as ExecuteTest from '../Test/Test.ts'
import * as FileSystem from '../TestFrameWorkComponentFileSystem/TestFrameWorkComponentFileSystem.ts'
import * as TestInfo from '../TestInfoCache/TestInfoCache.ts'

const whitespaceRegex = /\s+/g
const shouldHavePayloadSearch = 'shouldHavePayload('
const validIdentifierRegex = /^[A-Za-z_$][A-Za-z0-9_$]*$/

const normalizeWhitespace = (value: string): string => {
  return value.replaceAll(whitespaceRegex, '')
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const projectActualOntoExpected = (actualValue: unknown, expectedValue: unknown): unknown => {
  if (Array.isArray(expectedValue)) {
    if (!Array.isArray(actualValue)) {
      return actualValue
    }
    const length = Math.min(expectedValue.length, actualValue.length)
    return actualValue.slice(0, length).map((item, index) => projectActualOntoExpected(item, expectedValue[index]))
  }
  if (isObject(expectedValue)) {
    if (!isObject(actualValue)) {
      return actualValue
    }
    const result: Record<string, unknown> = {}
    for (const key of Object.keys(expectedValue)) {
      if (!Object.hasOwn(actualValue, key)) {
        continue
      }
      result[key] = projectActualOntoExpected(actualValue[key], expectedValue[key])
    }
    return result
  }
  return actualValue
}

const quoteString = (value: string): string => {
  return `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'").replaceAll('\n', '\\n').replaceAll('\r', '\\r').replaceAll('\t', '\\t')}'`
}

const formatObjectKey = (key: string): string => {
  if (validIdentifierRegex.test(key)) {
    return key
  }
  return quoteString(key)
}

const trySerialize = (value: unknown, indent = 0): string | undefined => {
  try {
    if (value === null) {
      return 'null'
    }
    if (typeof value === 'string') {
      return quoteString(value)
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      return JSON.stringify(value)
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return '[]'
      }
      const nextIndent = indent + 2
      const serializedItems = value.map((item) => `${' '.repeat(nextIndent)}${trySerialize(item, nextIndent)}`)
      return `[
${serializedItems.join(',\n')}
${' '.repeat(indent)}]`
    }
    if (isObject(value)) {
      const entries = Object.entries(value)
      if (entries.length === 0) {
        return '{}'
      }
      const nextIndent = indent + 2
      const serializedEntries = []
      for (const entry of entries) {
        const [key, item] = entry
        serializedEntries.push(`${' '.repeat(nextIndent)}${formatObjectKey(key)}: ${trySerialize(item, nextIndent)}`)
      }
      return `{
${serializedEntries.join(',\n')}
${' '.repeat(indent)}}`
    }
    return undefined
  } catch {
    return undefined
  }
}

const replaceMatch = (fileContent: string, index: number, length: number, replacement: string): string => {
  const before = fileContent.slice(0, index)
  const after = fileContent.slice(index + length)
  return `${before}${replacement}${after}`
}

interface ShouldHavePayloadMatch {
  readonly argument: string
  readonly index: number
  readonly length: number
}

interface ScanState {
  depth: number
  inBlockComment: boolean
  inLineComment: boolean
  stringDelimiter: string
}

const isStringDelimiter = (character: string): boolean => {
  return character === '\'' || character === '"' || character === '`'
}

const consumeComment = (state: ScanState, character: string, nextCharacter: string): number => {
  if (state.inLineComment) {
    if (character === '\n') {
      state.inLineComment = false
    }
    return 1
  }
  if (state.inBlockComment) {
    if (character === '*' && nextCharacter === '/') {
      state.inBlockComment = false
      return 2
    }
    return 1
  }
  if (character === '/' && nextCharacter === '/') {
    state.inLineComment = true
    return 2
  }
  if (character === '/' && nextCharacter === '*') {
    state.inBlockComment = true
    return 2
  }
  return 0
}

const consumeString = (state: ScanState, character: string): number => {
  if (!state.stringDelimiter) {
    if (isStringDelimiter(character)) {
      state.stringDelimiter = character
      return 1
    }
    return 0
  }
  if (character === '\\') {
    return 2
  }
  if (character === state.stringDelimiter) {
    state.stringDelimiter = ''
  }
  return 1
}

const findClosingParenthesis = (fileContent: string, startIndex: number): number => {
  const state: ScanState = {
    depth: 1,
    inBlockComment: false,
    inLineComment: false,
    stringDelimiter: '',
  }
  for (let index = startIndex; index < fileContent.length;) {
    const character = fileContent[index]
    const nextCharacter = fileContent[index + 1]
    const commentLength = consumeComment(state, character, nextCharacter)
    if (commentLength > 0) {
      index += commentLength
      continue
    }
    const stringLength = consumeString(state, character)
    if (stringLength > 0) {
      index += stringLength
      continue
    }
    if (character === '(') {
      state.depth++
      index++
      continue
    }
    if (character === ')') {
      state.depth--
      if (state.depth === 0) {
        return index
      }
    }
    index++
  }
  return -1
}

const findShouldHavePayloadMatches = (fileContent: string): readonly ShouldHavePayloadMatch[] => {
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

const replaceShouldHavePayload = (fileContent: string, expectedPayload: unknown, actualPayload: unknown): string | undefined => {
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

const getFileUrlFromRemotePath = (rawPathName: string): string | undefined => {
  if (!rawPathName.startsWith('/remote')) {
    return undefined
  }
  const rest = rawPathName.slice('/remote'.length)
  return `file://${rest}`
}

const toFileUrl = (url: string, locationHref: string): string | undefined => {
  const parsedUrl = new URL(url, locationHref)
  if (parsedUrl.protocol === 'file:') {
    parsedUrl.hash = ''
    parsedUrl.search = ''
    return parsedUrl.toString()
  }
  return getFileUrlFromRemotePath(parsedUrl.pathname)
}

const isAutoFixError = (value: AutoFixError | undefined): value is AutoFixError => {
  if (!value) {
    return false
  }
  return value.code === 'chat-debug.should-have-payload'
}

interface TryAutoFixDependencies {
  readonly getAutoFixError: () => AutoFixError | undefined
  readonly getLatestTestInfo: () => TestInfoCache.TestInfoItem | undefined
  readonly getLocationHref: () => string
  readonly now: () => number
  readonly readFile: (uri: string) => Promise<string>
  readonly rerun: (url: string, platform: number, assetDir: string) => Promise<void>
  readonly setAutoFixError: (value: AutoFixError | undefined) => void
  readonly writeFile: (uri: string, content: string) => Promise<void>
}

const defaultDependencies: TryAutoFixDependencies = {
  getAutoFixError() {
    return AutoFixState.get()
  },
  getLatestTestInfo() {
    return TestInfo.maybeLast()
  },
  getLocationHref() {
    return location.href
  },
  now: Date.now,
  readFile(uri) {
    return FileSystem.readFile(uri)
  },
  rerun(url, platform, assetDir) {
    return ExecuteTest.execute(url, platform, assetDir)
  },
  setAutoFixError(value) {
    AutoFixState.set(value)
  },
  writeFile(uri, content) {
    return FileSystem.writeFile(uri, content)
  },
}

export const tryAutoFixWith = async (dependencies: TryAutoFixDependencies): Promise<void> => {
  const latestTestInfo = dependencies.getLatestTestInfo()
  if (!latestTestInfo) {
    return
  }
  if (latestTestInfo.inProgress) {
    return
  }
  const autoFixError = dependencies.getAutoFixError()
  if (!isAutoFixError(autoFixError)) {
    return
  }
  if (autoFixError.actualPayload === undefined) {
    return
  }
  const locationHref = dependencies.getLocationHref()
  const fileUrl = toFileUrl(latestTestInfo.url, locationHref)
  if (!fileUrl) {
    return
  }
  const fileContent = await dependencies.readFile(fileUrl)
  const updatedFileContent = replaceShouldHavePayload(fileContent, autoFixError.expectedPayload, autoFixError.actualPayload)
  if (!updatedFileContent || updatedFileContent === fileContent) {
    return
  }
  await dependencies.writeFile(fileUrl, updatedFileContent)
  dependencies.setAutoFixError(undefined)
  const rerunUrl = createUrlWithQueryParameter(latestTestInfo.url, locationHref, dependencies.now())
  await dependencies.rerun(rerunUrl, latestTestInfo.platform, latestTestInfo.assetDir)
}

export const tryAutoFix = async (): Promise<void> => {
  await tryAutoFixWith(defaultDependencies)
}
