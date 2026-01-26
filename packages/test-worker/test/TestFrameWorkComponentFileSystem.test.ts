import { expect, test, jest } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as FileSystem from '../src/parts/TestFrameWorkComponentFileSystem/TestFrameWorkComponentFileSystem.ts'

test('writeFile', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.writeFile'() {
      return undefined
    },
  })

  await FileSystem.writeFile('memfs:///file.txt', 'content')

  expect(mockRpc.invocations).toEqual([['FileSystem.writeFile', 'memfs:///file.txt', 'content']])
})

test('writeJson', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.writeFile'() {
      return undefined
    },
  })

  await FileSystem.writeJson('memfs:///data.json', { a: 1 })

  const expected = '{\n  "a": 1\n}\n'
  expect(mockRpc.invocations).toEqual([['FileSystem.writeFile', 'memfs:///data.json', expected]])
})

test('readFile', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile'() {
      return 'content'
    },
  })

  const content: string = await FileSystem.readFile('memfs:///file.txt')
  expect(content).toBe('content')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', 'memfs:///file.txt']])
})

test('addFileHandle', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.addFileHandle'() {
      return undefined
    },
  })

  const file = new File(['content'], 'test.txt', { type: 'text/plain' })
  await FileSystem.addFileHandle(file)

  expect(mockRpc.invocations).toEqual([['FileSystem.addFileHandle', file]])
})

test('mkdir', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.mkdir'() {
      return undefined
    },
  })

  await FileSystem.mkdir('memfs:///dir')
  expect(mockRpc.invocations).toEqual([['FileSystem.mkdir', 'memfs:///dir']])
})

test('remove', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.remove'() {
      return undefined
    },
  })

  await FileSystem.remove('memfs:///file.txt')
  expect(mockRpc.invocations).toEqual([['FileSystem.remove', 'memfs:///file.txt']])
})

test('setFiles', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.writeFile'() {
      return undefined
    },
  })

  const files = [
    { content: 'content1', uri: 'memfs:///file1.txt' },
    { content: 'content2', uri: 'memfs:///file2.txt' },
  ]
  await FileSystem.setFiles(files)

  expect(mockRpc.invocations).toEqual([
    ['FileSystem.writeFile', 'memfs:///file1.txt', 'content1'],
    ['FileSystem.writeFile', 'memfs:///file2.txt', 'content2'],
  ])
})

test('getTmpDir: memfs default', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})

  const tmpDir: string = await FileSystem.getTmpDir()
  expect(tmpDir).toBe('memfs:///workspace')
  expect(mockRpc.invocations).toEqual([])
})

test('getTmpDir: file scheme', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'PlatformPaths.getTmpDir'() {
      return '/tmp'
    },
  })

  const tmpDir: string = await FileSystem.getTmpDir({ scheme: 'file' })
  expect(tmpDir).toBe('/tmp')
  expect(mockRpc.invocations).toEqual([['PlatformPaths.getTmpDir']])
})

test('chmod', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.chmod'() {
      return undefined
    },
  })

  await FileSystem.chmod('file:///bin', '755')
  expect(mockRpc.invocations).toEqual([['FileSystem.chmod', 'file:///bin', '755']])
})

test('readDir', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes'() {
      return undefined
    },
  })

  await FileSystem.readDir('memfs:///dir')
  expect(mockRpc.invocations).toEqual([['FileSystem.readDirWithFileTypes', 'memfs:///dir']])
})

test('createExecutable', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.chmod'() {
      return undefined
    },
    'FileSystem.writeFile'() {
      return undefined
    },
    'PlatformPaths.getNodePath'() {
      return '/usr/bin/node'
    },
    'PlatformPaths.getTmpDir'() {
      return '/tmp'
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
  using mockRpc = RendererWorker.registerMockRpc({
    'Ajax.getText'() {
      return "console.log('ok')"
    },
    'FileSystem.chmod'() {
      return undefined
    },
    'FileSystem.writeFile'() {
      return undefined
    },
    'PlatformPaths.getNodePath'() {
      return '/usr/bin/node'
    },
    'PlatformPaths.getTestPath'() {
      return '/tests'
    },
    'PlatformPaths.getTmpDir'() {
      return '/tmp'
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
  using mockRpc = RendererWorker.registerMockRpc({
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

test.skip('loadFixture - Web platform', async () => {
  // Mock loadFileMap to return a file map
  const mockFileMap = {
    'src/file1.ts': 'content1',
    'src/file2.ts': 'content2',
  }

  // Mock fetch for loadFileMap
  const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>
  const mockResponse = Response.json(mockFileMap, {
    status: 200,
    statusText: 'OK',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)
  ;(globalThis as any).fetch = mockFetch

  const result: string = await FileSystem.loadFixture(PlatformType.Web, 'http://localhost:3000/fixture')

  expect(result).toBe('')
  expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/fixture/fileMap.json')
})

test.skip('loadFixture - non-Web platform', async () => {
  const result: string = await FileSystem.loadFixture(PlatformType.Electron, 'http://localhost:3000/remote/test/fixture')

  expect(result).toBe('file:///test/fixture')
})

test.skip('loadFixture - Remote platform', async () => {
  const result: string = await FileSystem.loadFixture(PlatformType.Remote, 'http://localhost:3000/remote/test/fixture')

  expect(result).toBe('file:///test/fixture')
})

test('loadFixture - invalid url', async () => {
  const url = undefined
  // @ts-expect-error
  await expect(FileSystem.loadFixture(PlatformType.Remote, url)).rejects.toThrow(new Error(`fixture url must be of type string`))
})
