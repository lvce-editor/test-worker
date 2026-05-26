import { afterEach, expect, jest, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import * as AutoFixState from '../src/parts/AutoFixState/AutoFixState.ts'
import * as TestInfoCache from '../src/parts/TestInfoCache/TestInfoCache.ts'
import { tryAutoFixWith } from '../src/parts/TryAutoFixWith/TryAutoFixWith.ts'

const tempDirs: string[] = []

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

const createTempTestFile = async (content: string): Promise<string> => {
  const dir = await import('node:fs/promises').then(({ mkdtemp }) => mkdtemp(join(tmpdir(), 'try-autofix-')))
  tempDirs.push(dir)
  const filePath = join(dir, 'test.mjs')
  await writeFile(filePath, content, 'utf8')
  return new URL(`file://${filePath}`).toString()
}

afterEach(() => {
  AutoFixState.clear()
  TestInfoCache.clear()
  jest.restoreAllMocks()
  return Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { force: true, recursive: true }))).then(() => undefined)
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
  const fileUrl = await createTempTestFile(fileContent)
  let writtenUri = ''
  let writtenContent = ''
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.getPayload'() {
      return {
        actual: true,
      }
    },
    'FileSystem.readFile'() {
      return fileContent
    },
    'FileSystem.writeFile'(uri: string, content: string) {
      writtenUri = uri
      writtenContent = content
      return writeFile(new URL(uri), content, 'utf8').then(() => undefined)
    },
    'Preferences.get'() {
      return false
    },
    'TestFrameWork.showOverlay'() {
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
    url: `${fileUrl}?time=999`,
  })
  expect(AutoFixState.get()).toBeUndefined()
  expect(consoleInfoSpy).toHaveBeenCalledTimes(1)
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
  const fileUrl = await createTempTestFile(fileContent)
  let writtenContent = ''
  using mockRpc = RendererWorker.registerMockRpc({
    'ChatDebug.getPayload'() {
      return {
        ignored: true,
        input: 'def',
      }
    },
    'FileSystem.readFile'() {
      return fileContent
    },
    'FileSystem.writeFile'(_uri: string, content: string) {
      writtenContent = content
      return writeFile(new URL(fileUrl), content, 'utf8').then(() => undefined)
    },
    'Preferences.get'() {
      return false
    },
    'TestFrameWork.showOverlay'() {
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
  expect(TestInfoCache.last().url).toBe(`${fileUrl}?time=321`)
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
  const fileUrl = await createTempTestFile(fileContent)
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
    'FileSystem.readFile'() {
      return fileContent
    },
    'FileSystem.writeFile'(_uri: string, content: string) {
      writtenContent = content
      return writeFile(new URL(fileUrl), content, 'utf8').then(() => undefined)
    },
    'Preferences.get'() {
      return false
    },
    'TestFrameWork.showOverlay'() {
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
  const fileUrl = await createTempTestFile(fileContent)
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
    'FileSystem.readFile'() {
      return fileContent
    },
    'FileSystem.writeFile'(_uri: string, content: string) {
      writtenContent = content
      return writeFile(new URL(fileUrl), content, 'utf8').then(() => undefined)
    },
    'Preferences.get'() {
      return false
    },
    'TestFrameWork.showOverlay'() {
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
})
