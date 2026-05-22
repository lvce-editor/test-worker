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
    expected: true,
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
          expected: true,
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
  expect(writtenContent).toContain('await ChatDebug.shouldHavePayload({\n  "actual": true\n})')
  expect(rerunUrl).toBe('http://localhost:3000/remote/workspace/test.ts?time=999')
})
