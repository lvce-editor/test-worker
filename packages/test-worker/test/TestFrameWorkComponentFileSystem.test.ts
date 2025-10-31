import { expect, test, jest } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
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

test('addFileHandle', async () => {
  const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' })
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.addFileHandle'() {
      return undefined
    },
  })

  await FileSystem.addFileHandle(mockFile)
  expect(mockRpc.invocations).toEqual([['FileSystem.addFileHandle', mockFile]])
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

test('readDir', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes'() {
      return []
    },
  })

  const result: any = await FileSystem.readDir('memfs:///dir')
  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([['FileSystem.readDirWithFileTypes', 'memfs:///dir']])
})

test('mkdir', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.mkdir'() {
      return undefined
    },
  })

  await FileSystem.mkdir('memfs:///dir')
  expect(mockRpc.invocations).toEqual([['FileSystem.mkdir', 'memfs:///dir']])
})

test('remove', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.remove'() {
      return undefined
    },
  })

  await FileSystem.remove('memfs:///file.txt')
  expect(mockRpc.invocations).toEqual([['FileSystem.remove', 'memfs:///file.txt']])
})

test('getTmpDir: memfs default', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  const tmpDir: string = await FileSystem.getTmpDir()
  expect(tmpDir).toBe('memfs:///workspace')
  expect(mockRpc.invocations).toEqual([])
})

test('getTmpDir: file scheme', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'PlatformPaths.getTmpDir'() {
      return '/tmp'
    },
  })

  const tmpDir: string = await FileSystem.getTmpDir({ scheme: 'file' })
  expect(tmpDir).toBe('/tmp')
  expect(mockRpc.invocations).toEqual([['PlatformPaths.getTmpDir']])
})

test('chmod', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.chmod'() {
      return undefined
    },
  })

  await FileSystem.chmod('file:///bin', '755')
  expect(mockRpc.invocations).toEqual([['FileSystem.chmod', 'file:///bin', '755']])
})

test('createExecutable', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'PlatformPaths.getTmpDir'() {
      return '/tmp'
    },
    'PlatformPaths.getNodePath'() {
      return '/usr/bin/node'
    },
    'FileSystem.writeFile'() {
      return undefined
    },
    'FileSystem.chmod'() {
      return undefined
    },
  })

  const path: string = await FileSystem.createExecutable("console.log('hi')")

  expect(path).toBe('/tmp/git')
  expect(mockRpc.invocations).toEqual([
    ['PlatformPaths.getTmpDir'],
    ['PlatformPaths.getNodePath'],
    ['FileSystem.writeFile', '/tmp/git', "#!/usr/bin/node\n  console.log('hi')"],
    ['FileSystem.chmod', '/tmp/git', '755'],
  ])
})

test('createExecutableFrom', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'PlatformPaths.getTestPath'() {
      return '/tests'
    },
    'Ajax.getText'() {
      return "console.log('ok')"
    },
    'PlatformPaths.getTmpDir'() {
      return '/tmp'
    },
    'PlatformPaths.getNodePath'() {
      return '/usr/bin/node'
    },
    'FileSystem.writeFile'() {
      return undefined
    },
    'FileSystem.chmod'() {
      return undefined
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
    ['FileSystem.chmod', '/tmp/git', '755'],
  ])
})

test('createDroppedFileHandle', async () => {
  const mockFile = new File(['test content'], 'dropped-file.txt', { type: 'text/plain' })
  const mockFileHandle = {
    async getFile(): Promise<File> {
      return mockFile
    },
  }
  const mockDirectory = {
    async getFileHandle(): Promise<typeof mockFileHandle> {
      return mockFileHandle
    },
  }

  // Mock navigator.storage.getDirectory
  Object.defineProperty(globalThis, 'navigator', {
    value: {
      storage: {
        async getDirectory(): Promise<typeof mockDirectory> {
          return mockDirectory
        },
      },
    },
    writable: true,
  })

  // Mock the RPC call using registerMockRpc
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystemHandle.addFileHandle'() {
      return 123
    },
  })

  const result = await FileSystem.createDroppedFileHandle()

  expect(result).toEqual({
    file: mockFile,
    id: 123,
  })
  expect(mockRpc.invocations).toEqual([['FileSystemHandle.addFileHandle', mockFileHandle]])
})

test('loadFixture - Web platform', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.writeFile'() {
      return undefined
    },
  })

  // Mock the getFileMapWeb function by mocking the fetch call
  const mockFileMap = {
    'src/file1.ts': 'content1',
    'src/file2.ts': 'content2',
  }

  const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>
  const mockResponse = Response.json(mockFileMap, {
    status: 200,
    statusText: 'OK',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)
  ;(globalThis as any).fetch = mockFetch

  const result: string = await FileSystem.loadFixture(PlatformType.Web, 'http://localhost:3000/fixture')

  expect(result).toBe('memfs:///fixture')
  expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/fixture/fileMap.json')
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.writeFile', 'memfs:///fixture/src/file1.ts', 'content1'],
    ['FileSystem.writeFile', 'memfs:///fixture/src/file2.ts', 'content2'],
  ])
})

test('loadFixture - non-Web platform', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.writeFile'() {
      return undefined
    },
    'FileSystem.readDirWithFileTypes'() {
      return []
    },
  })

  const result: string = await FileSystem.loadFixture(PlatformType.Electron, 'http://localhost:3000/remote/test/fixture')

  expect(result).toBe('memfs:///fixture')
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.readDirWithFileTypes', 'file:///test/fixture'],
  ])
})

test('loadFixture - Remote platform', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.writeFile'() {
      return undefined
    },
    'FileSystem.readDirWithFileTypes'() {
      return []
    },
  })

  const result: string = await FileSystem.loadFixture(PlatformType.Remote, 'http://localhost:3000/remote/test/fixture')

  expect(result).toBe('memfs:///fixture')
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.readDirWithFileTypes', 'file:///test/fixture'],
  ])
})

test('loadFixture - invalid url', async () => {
  const url = undefined
  // @ts-expect-error
  await expect(FileSystem.loadFixture(PlatformType.Remote, url)).rejects.toThrow(new Error(`fixture url must be of type string`))
})
