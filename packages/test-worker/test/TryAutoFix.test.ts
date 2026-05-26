import { afterEach, expect, jest, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as AutoFixState from '../src/parts/AutoFixState/AutoFixState.ts'
import * as TestInfoCache from '../src/parts/TestInfoCache/TestInfoCache.ts'
const executeMock = jest.fn(() => Promise.resolve())

jest.unstable_mockModule('../src/parts/Test/Test.ts', () => ({
  execute: executeMock,
}))
const { tryAutoFixWith } = await import('../src/parts/TryAutoFixWith/TryAutoFixWith.ts')

let testFileId = 0

const setLocation = (href: string): (() => void) => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'location')
  Object.defineProperty(globalThis, 'location', {
    configurable: true,
    value: new URL(href),
  })
  return () => {
    if (originalDescriptor) {
      Object.defineProperty(globalThis, 'location', originalDescriptor)
      return
    }
    Reflect.deleteProperty(globalThis, 'location')
  }
}

const setAutoFixError = (expectedPayload: unknown, actualPayload: unknown): void => {
  AutoFixState.set({
    actualPayload,
    code: 'chat-debug.should-have-payload',
    expectedPayload,
  })
}

const pushLatestTestInfo = (url: string, platform = PlatformType.Remote): void => {
  TestInfoCache.push({
    assetDir: 'memfs://assets',
    inProgress: false,
    platform,
    url,
  })
}

const createMemoryFsTestFile = (content: string): { files: Record<string, string>; fileUrl: string } => {
  testFileId++
  const fileUrl = `file:///try-autofix-${testFileId}.mjs`
  return {
    files: {
      [fileUrl]: content,
    },
    fileUrl,
  }
}

afterEach(() => {
  AutoFixState.clear()
  TestInfoCache.clear()
  executeMock.mockReset()
  executeMock.mockResolvedValue(undefined)
  jest.restoreAllMocks()
})

test('tryAutoFixWith returns early when there is no latest test item', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile'() {
      return ''
    },
    'FileSystem.writeFile'() {
      return undefined
    },
  })
  const restoreLocation = setLocation('http://localhost:3000')
  setAutoFixError({ expected: true }, { actual: true })

  await tryAutoFixWith()

  restoreLocation()
  expect(mockRpc.invocations).toEqual([])
})

test('tryAutoFixWith returns early for unsupported url scheme', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile'() {
      return ''
    },
    'FileSystem.writeFile'() {
      return undefined
    },
  })
  const restoreLocation = setLocation('http://localhost:3000')
  setAutoFixError({ expected: true }, { actual: true })
  pushLatestTestInfo('memfs:///file.ts', PlatformType.Web)

  await tryAutoFixWith()

  restoreLocation()
  expect(mockRpc.invocations).toEqual([])
})

test('tryAutoFixWith replaces shouldHavePayload and reruns test', async () => {
  const fileContent = `
export const name = 'chat-debug-test'
export const test = async ({ ChatDebug }) => {
  await ChatDebug.shouldHavePayload({
    actual: false,
  })
}
`
  const { files, fileUrl } = createMemoryFsTestFile(fileContent)
  let writtenUri = ''
  let writtenContent = ''
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.getPayload'() {
      return {
        actual: true,
      }
    },
    'FileSystem.readFile'(uri: string) {
      return files[uri]
    },
    'FileSystem.writeFile'(uri: string, content: string) {
      writtenUri = uri
      writtenContent = content
      files[uri] = content
      return undefined
    },
  })
  const restoreLocation = setLocation('http://localhost:3000')
  jest.spyOn(Date, 'now').mockImplementation(() => 999)
  const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
  setAutoFixError({ actual: false }, { actual: true })
  pushLatestTestInfo(fileUrl)

  await tryAutoFixWith()

  restoreLocation()
  expect(writtenUri).toBe(fileUrl)
  expect(writtenContent).toContain('await ChatDebug.shouldHavePayload({\n  actual: true\n})')
  expect(TestInfoCache.last()).toEqual({
    assetDir: 'memfs://assets',
    inProgress: false,
    platform: PlatformType.Remote,
    url: fileUrl,
  })
  expect(AutoFixState.get()).toBeUndefined()
  expect(executeMock).toHaveBeenCalledTimes(1)
  expect(executeMock.mock.calls[0]).toEqual([`${fileUrl}?time=999`, PlatformType.Remote, 'memfs://assets'])
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.readFile', fileUrl],
    ['FileSystem.writeFile', fileUrl, writtenContent],
  ])
  expect(consoleInfoSpy).toHaveBeenCalledTimes(0)
})

test('tryAutoFixWith keeps payload fix minimal', async () => {
  const fileContent = `
export const name = 'chat-debug-test'
export const test = async ({ ChatDebug }) => {
  await ChatDebug.shouldHavePayload({
    input: 'abc',
  })
}
`
  const { files, fileUrl } = createMemoryFsTestFile(fileContent)
  let writtenContent = ''
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.getPayload'() {
      return {
        ignored: true,
        input: 'def',
      }
    },
    'FileSystem.readFile'(uri: string) {
      return files[uri]
    },
    'FileSystem.writeFile'(_uri: string, content: string) {
      writtenContent = content
      files[fileUrl] = content
      return undefined
    },
  })
  const restoreLocation = setLocation('http://localhost:3000')
  jest.spyOn(Date, 'now').mockImplementation(() => 321)
  jest.spyOn(console, 'info').mockImplementation(() => {})
  setAutoFixError({ input: 'abc' }, { ignored: true, input: 'def' })
  pushLatestTestInfo(fileUrl)

  await tryAutoFixWith()

  restoreLocation()
  expect(writtenContent).toContain("input: 'def'")
  expect(writtenContent).not.toContain('ignored')
  expect(TestInfoCache.last().url).toBe(fileUrl)
  expect(executeMock.mock.calls[0]).toEqual([`${fileUrl}?time=321`, PlatformType.Remote, 'memfs://assets'])
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.readFile', fileUrl],
    ['FileSystem.writeFile', fileUrl, writtenContent],
  ])
})

test('tryAutoFixWith handles payload strings containing closing parentheses', async () => {
  const fileContent = `
export const name = 'chat-debug-test'
export const test = async ({ ChatDebug }) => {
  await ChatDebug.shouldHavePayload({
    input: [
      {
        content: 'Prefer file links like [src/index.ts]({{workspaceUri}}/src/index.ts)',
        role: 'system',
      },
    ],
  })
}
`
  const { files, fileUrl } = createMemoryFsTestFile(fileContent)
  let writtenContent = ''
  const expectedContent = `
export const name = 'chat-debug-test'
export const test = async ({ ChatDebug }) => {
  await ChatDebug.shouldHavePayload({
  input: [
    {
      content: 'Updated prompt with [src/index.ts]({{workspaceUri}}/src/index.ts)',
      role: 'system'
    }
  ]
})
}
`
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.getPayload'() {
      return {
        input: [
          {
            content: 'Updated prompt with [src/index.ts]({{workspaceUri}}/src/index.ts)',
            ignored: true,
            role: 'system',
          },
        ],
      }
    },
    'FileSystem.readFile'(uri: string) {
      return files[uri]
    },
    'FileSystem.writeFile'(_uri: string, content: string) {
      writtenContent = content
      files[fileUrl] = content
      return undefined
    },
  })
  const restoreLocation = setLocation('http://localhost:3000')
  jest.spyOn(console, 'info').mockImplementation(() => {})
  setAutoFixError(
    {
      input: [
        {
          content: 'Prefer file links like [src/index.ts]({{workspaceUri}}/src/index.ts)',
          role: 'system',
        },
      ],
    },
    {
      input: [
        {
          content: 'Updated prompt with [src/index.ts]({{workspaceUri}}/src/index.ts)',
          ignored: true,
          role: 'system',
        },
      ],
    },
  )
  pushLatestTestInfo(fileUrl)

  await tryAutoFixWith()

  restoreLocation()
  expect(writtenContent).toBe(expectedContent)
  expect(executeMock).toHaveBeenCalledTimes(1)
  expect(executeMock.mock.calls[0]).toEqual([expect.stringMatching(new RegExp(`^${fileUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\?time=\\d+$`)), PlatformType.Remote, 'memfs://assets'])
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.readFile', fileUrl],
    ['FileSystem.writeFile', fileUrl, writtenContent],
  ])
})

test('tryAutoFixWith handles payload strings containing double slashes', async () => {
  const fileContent = `
export const name = 'chat-debug-test'
export const test = async ({ ChatDebug }) => {
  await ChatDebug.shouldHavePayload({
    input: [
      {
        content: 'Create the generated-file directory in the workspace',
        role: 'user',
      },
      {
        arguments: '{"content":"test","uri":"memfs:///workspace/generated-file"}',
        call_id: 'call_expected',
        name: 'write_file',
        type: 'function_call',
      },
      {
        call_id: 'call_expected',
        output: '{"addedLines":1,"ok":true,"removedLines":0,"uri":"memfs:///workspace/generated-file"}',
        type: 'function_call_output',
      },
    ],
  })
}
`
  const { files, fileUrl } = createMemoryFsTestFile(fileContent)
  let writtenContent = ''
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.getPayload'() {
      return {
        input: [
          {
            content: 'Create the generated-file directory in the workspace',
            role: 'user',
          },
          {
            arguments: '{"content":"test","uri":"memfs:///workspace/generated-file"}',
            call_id: 'call_actual',
            name: 'write_file',
            type: 'function_call',
          },
          {
            call_id: 'call_actual',
            output: '{"addedLines":1,"ok":true,"removedLines":0,"uri":"memfs:///workspace/generated-file"}',
            type: 'function_call_output',
          },
        ],
      }
    },
    'FileSystem.readFile'(uri: string) {
      return files[uri]
    },
    'FileSystem.writeFile'(_uri: string, content: string) {
      writtenContent = content
      files[fileUrl] = content
      return undefined
    },
  })
  const restoreLocation = setLocation('http://localhost:3000')
  jest.spyOn(console, 'info').mockImplementation(() => {})
  setAutoFixError(
    {
      input: [
        {
          content: 'Create the generated-file directory in the workspace',
          role: 'user',
        },
        {
          arguments: '{"content":"test","uri":"memfs:///workspace/generated-file"}',
          call_id: 'call_expected',
          name: 'write_file',
          type: 'function_call',
        },
        {
          call_id: 'call_expected',
          output: '{"addedLines":1,"ok":true,"removedLines":0,"uri":"memfs:///workspace/generated-file"}',
          type: 'function_call_output',
        },
      ],
    },
    {
      input: [
        {
          content: 'Create the generated-file directory in the workspace',
          role: 'user',
        },
        {
          arguments: '{"content":"test","uri":"memfs:///workspace/generated-file"}',
          call_id: 'call_actual',
          name: 'write_file',
          type: 'function_call',
        },
        {
          call_id: 'call_actual',
          output: '{"addedLines":1,"ok":true,"removedLines":0,"uri":"memfs:///workspace/generated-file"}',
          type: 'function_call_output',
        },
      ],
    },
  )
  pushLatestTestInfo(fileUrl)

  await tryAutoFixWith()

  restoreLocation()
  expect(writtenContent).toContain("call_id: 'call_actual'")
  expect(executeMock).toHaveBeenCalledTimes(1)
  expect(executeMock.mock.calls[0]).toEqual([expect.stringMatching(new RegExp(`^${fileUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\?time=\\d+$`)), PlatformType.Remote, 'memfs://assets'])
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.readFile', fileUrl],
    ['FileSystem.writeFile', fileUrl, writtenContent],
  ])
})
