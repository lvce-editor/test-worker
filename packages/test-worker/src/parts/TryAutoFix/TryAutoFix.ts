import type { AutoFixError } from '../AutoFixError/AutoFixError.ts'
import type * as TestInfoCache from '../TestInfoCache/TestInfoCache.ts'
import * as AutoFixState from '../AutoFixState/AutoFixState.ts'
import { createUrlWithQueryParameter } from '../CreateUrlWithQueryParameter/CreateUrlWithQueryParameter.ts'
import * as ExecuteTest from '../Test/Test.ts'
import * as FileSystem from '../TestFrameWorkComponentFileSystem/TestFrameWorkComponentFileSystem.ts'
import * as TestInfo from '../TestInfoCache/TestInfoCache.ts'

const whitespaceRegex = /\s+/g
const shouldHavePayloadRegex = /shouldHavePayload\(([^)]*)\)/gs

const normalizeWhitespace = (value: string): string => {
  return value.replaceAll(whitespaceRegex, '')
}

const trySerialize = (value: unknown): string | undefined => {
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return undefined
  }
}

const replaceMatch = (fileContent: string, index: number, length: number, replacement: string): string => {
  const before = fileContent.slice(0, index)
  const after = fileContent.slice(index + length)
  return `${before}${replacement}${after}`
}

const replaceShouldHavePayload = (fileContent: string, expectedPayload: unknown, actualPayload: unknown): string | undefined => {
  const serializedActual = trySerialize(actualPayload)
  if (!serializedActual) {
    return undefined
  }
  const matches = [...fileContent.matchAll(shouldHavePayloadRegex)]
  if (matches.length === 0) {
    return undefined
  }
  if (matches.length === 1) {
    const [match] = matches
    if (typeof match.index !== 'number') {
      return undefined
    }
    return replaceMatch(fileContent, match.index, match[0].length, `shouldHavePayload(${serializedActual})`)
  }
  const serializedExpected = trySerialize(expectedPayload)
  if (!serializedExpected) {
    return undefined
  }
  const normalizedExpected = normalizeWhitespace(serializedExpected)
  const matchingCandidates = []
  for (const match of matches) {
    const currentArgument = match[1]
    if (normalizeWhitespace(currentArgument) === normalizedExpected) {
      matchingCandidates.push(match)
    }
  }
  if (matchingCandidates.length !== 1) {
    return undefined
  }
  const [candidate] = matchingCandidates
  if (typeof candidate.index !== 'number') {
    return undefined
  }
  return replaceMatch(fileContent, candidate.index, candidate[0].length, `shouldHavePayload(${serializedActual})`)
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
