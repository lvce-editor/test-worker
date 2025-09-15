import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as FileSystem from '../src/parts/TestFrameWorkComponentFileSystem/TestFrameWorkComponentFileSystem.ts'

test('writeFile', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.writeFile'() {
      return undefined
    },
  })

  await FileSystem.writeFile('memfs:///file.txt', 'content')

  expect(mockRpc.invocations).toEqual([['FileSystem.writeFile', 'memfs:///file.txt', 'content']])
})

test('writeJson', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.writeFile'() {
      return undefined
    },
  })

  await FileSystem.writeJson('memfs:///data.json', { a: 1 })

  const expected = '{\n  "a": 1\n}\n'
  expect(mockRpc.invocations).toEqual([['FileSystem.writeFile', 'memfs:///data.json', expected]])
})

test('readFile', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile'() {
      return 'content'
    },
  })

  const content: string = await FileSystem.readFile('memfs:///file.txt')
  expect(content).toBe('content')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', 'memfs:///file.txt']])
})

test('mkdir', async () => {
  const mockRpc = createMockRpcWithInvocations(async (method: string, ...args: readonly any[]) => {
    return undefined
  })

  await FileSystem.mkdir('memfs:///dir')
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.mkdir', 'memfs:///dir']
  ])
})

test('remove', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      return undefined
    },
  })

  await FileSystem.remove('memfs:///file.txt')
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.remove', 'memfs:///file.txt']
  ])
})

test('getTmpDir: memfs default', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      return undefined
    },
  })

  const tmpDir: string = await FileSystem.getTmpDir()
  expect(tmpDir).toBe('memfs:///workspace')
  expect(mockRpc.invocations).toEqual([])
})

test('getTmpDir: file scheme', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      if (method === 'PlatformPaths.getTmpDir') {
        return '/tmp'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  const tmpDir: string = await FileSystem.getTmpDir({ scheme: 'file' })
  expect(tmpDir).toBe('/tmp')
  expect(mockRpc.invocations).toEqual([
    ['PlatformPaths.getTmpDir']
  ])
})

test('chmod', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      return undefined
    },
  })

  await FileSystem.chmod('file:///bin', '755')
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.chmod', 'file:///bin', '755']
  ])
})

test('createExecutable', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      if (method === 'PlatformPaths.getTmpDir') {
        return '/tmp'
      }
      if (method === 'PlatformPaths.getNodePath') {
        return '/usr/bin/node'
      }
      if (method === 'FileSystem.writeFile' || method === 'FileSystem.chmod') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  const path: string = await FileSystem.createExecutable("console.log('hi')")

  expect(path).toBe('/tmp/git')
  expect(mockRpc.invocations).toEqual([
    ['PlatformPaths.getTmpDir'],
    ['PlatformPaths.getNodePath'],
    ['FileSystem.writeFile', '/tmp/git', "#!/usr/bin/node\n  console.log('hi')"],
    ['FileSystem.chmod', '/tmp/git', '755']
  ])
})

test('createExecutableFrom', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    commandMap: {},
    invoke: async (method: string, ...args: readonly any[]) => {
      if (method === 'PlatformPaths.getTestPath') {
        return '/tests'
      }
      if (method === 'Ajax.getText') {
        return "console.log('ok')"
      }
      if (method === 'PlatformPaths.getTmpDir') {
        return '/tmp'
      }
      if (method === 'PlatformPaths.getNodePath') {
        return '/usr/bin/node'
      }
      if (method === 'FileSystem.writeFile' || method === 'FileSystem.chmod') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  const path: string = await FileSystem.createExecutableFrom('fixtures/script.js')
  expect(path).toBe('/tmp/git')
  expect(mockRpc.invocations).toEqual([
    ['PlatformPaths.getTestPath'],
    ['Ajax.getText', '/tests/fixtures/script.js'],
    ['PlatformPaths.getTmpDir'],
    ['PlatformPaths.getNodePath'],
    ['FileSystem.writeFile', '/tmp/git', "#!/usr/bin/node\n  console.log('ok')"],
    ['FileSystem.chmod', '/tmp/git', '755']
  ])
})
