import { expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { tryAutoFixWith } from '../src/parts/TryAutoFix/TryAutoFix.ts'

test('tryAutoFixWith returns early when there is no latest test item', async () => {
  const writeCalls: string[] = []
  const rerunCalls: string[] = []

  await tryAutoFixWith({
    getAutoFixError() {
      return {
        actualPayload: {
          actual: true,
        },
        code: 'chat-debug.should-have-payload',
        expectedPayload: {
          expected: true,
        },
      }
    },
    getLatestTestInfo() {
      return undefined
    },
    getLocationHref() {
      return 'http://localhost:3000'
    },
    now() {
      return 123
    },
    async readFile() {
      return ''
    },
    async rerun() {
      rerunCalls.push('rerun')
    },
    setAutoFixError() {
      return undefined
    },
    async writeFile() {
      writeCalls.push('write')
    },
  })

  expect(writeCalls).toEqual([])
  expect(rerunCalls).toEqual([])
})

test('tryAutoFixWith returns early for unsupported url scheme', async () => {
  const writeCalls: string[] = []

  await tryAutoFixWith({
    getAutoFixError() {
      return {
        actualPayload: {
          actual: true,
        },
        code: 'chat-debug.should-have-payload',
        expectedPayload: {
          expected: true,
        },
      }
    },
    getLatestTestInfo() {
      return {
        assetDir: 'memfs://assets',
        inProgress: false,
        platform: PlatformType.Web,
        url: 'memfs:///file.ts',
      }
    },
    getLocationHref() {
      return 'http://localhost:3000'
    },
    now() {
      return 123
    },
    async readFile() {
      return ''
    },
    async rerun() {
      return undefined
    },
    setAutoFixError() {
      return undefined
    },
    async writeFile() {
      writeCalls.push('write')
    },
  })

  expect(writeCalls).toEqual([])
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
  let writtenUri = ''
  let writtenContent = ''
  let rerunUrl = ''

  await tryAutoFixWith({
    getAutoFixError() {
      return {
        actualPayload: {
          actual: true,
        },
        code: 'chat-debug.should-have-payload',
        expectedPayload: {
          actual: false,
        },
      }
    },
    getLatestTestInfo() {
      return {
        assetDir: 'memfs://assets',
        inProgress: false,
        platform: PlatformType.Remote,
        url: '/remote/workspace/test.ts',
      }
    },
    getLocationHref() {
      return 'http://localhost:3000'
    },
    now() {
      return 999
    },
    async readFile() {
      return fileContent
    },
    async rerun(url) {
      rerunUrl = url
    },
    setAutoFixError() {
      return undefined
    },
    async writeFile(uri, content) {
      writtenUri = uri
      writtenContent = content
    },
  })

  expect(writtenUri).toBe('file:///workspace/test.ts')
  expect(writtenContent).toContain('await ChatDebug.shouldHavePayload({\n  actual: true\n})')
  expect(rerunUrl).toBe('http://localhost:3000/remote/workspace/test.ts?time=999')
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
  let writtenContent = ''

  await tryAutoFixWith({
    getAutoFixError() {
      return {
        actualPayload: {
          ignored: true,
          input: 'def',
        },
        code: 'chat-debug.should-have-payload',
        expectedPayload: {
          input: 'abc',
        },
      }
    },
    getLatestTestInfo() {
      return {
        assetDir: 'memfs://assets',
        inProgress: false,
        platform: PlatformType.Remote,
        url: '/remote/workspace/test.ts',
      }
    },
    getLocationHref() {
      return 'http://localhost:3000'
    },
    now() {
      return 999
    },
    async readFile() {
      return fileContent
    },
    async rerun() {
      return undefined
    },
    setAutoFixError() {
      return undefined
    },
    async writeFile(_uri, content) {
      writtenContent = content
    },
  })

  expect(writtenContent).toContain("input: 'def'")
  expect(writtenContent).not.toContain('ignored')
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

  await tryAutoFixWith({
    getAutoFixError() {
      return {
        actualPayload: {
          input: [
            {
              content: 'Updated prompt with [src/index.ts]({{workspaceUri}}/src/index.ts)',
              ignored: true,
              role: 'system',
            },
          ],
        },
        code: 'chat-debug.should-have-payload',
        expectedPayload: {
          input: [
            {
              content: 'Prefer file links like [src/index.ts]({{workspaceUri}}/src/index.ts)',
              role: 'system',
            },
          ],
        },
      }
    },
    getLatestTestInfo() {
      return {
        assetDir: 'memfs://assets',
        inProgress: false,
        platform: PlatformType.Remote,
        url: '/remote/workspace/test.ts',
      }
    },
    getLocationHref() {
      return 'http://localhost:3000'
    },
    now() {
      return 999
    },
    async readFile() {
      return fileContent
    },
    async rerun() {
      return undefined
    },
    setAutoFixError() {
      return undefined
    },
    async writeFile(_uri, content) {
      writtenContent = content
    },
  })

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
  let writtenContent = ''

  await tryAutoFixWith({
    getAutoFixError() {
      return {
        actualPayload: {
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
        code: 'chat-debug.should-have-payload',
        expectedPayload: {
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
      }
    },
    getLatestTestInfo() {
      return {
        assetDir: 'memfs://assets',
        inProgress: false,
        platform: PlatformType.Remote,
        url: '/remote/workspace/test.ts',
      }
    },
    getLocationHref() {
      return 'http://localhost:3000'
    },
    now() {
      return 999
    },
    async readFile() {
      return fileContent
    },
    async rerun() {
      return undefined
    },
    setAutoFixError() {
      return undefined
    },
    async writeFile(_uri, content) {
      writtenContent = content
    },
  })

  expect(writtenContent).toContain("call_id: 'call_actual'")
})
