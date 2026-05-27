import { expect, test, jest } from '@jest/globals'
import { DirentType, PlatformType } from '@lvce-editor/constants'
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
  const dateNowMock = jest.spyOn(Date, 'now').mockReturnValue(123)
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.mkdir'() {
      return undefined
    },
    'PlatformPaths.getTmpDir'() {
      return '/tmp'
    },
  })

  const tmpDir: string = await FileSystem.getTmpDir({ scheme: 'file' })
  expect(tmpDir).toBe('file:///tmp/test-123')
  expect(mockRpc.invocations).toEqual([['PlatformPaths.getTmpDir'], ['FileSystem.mkdir', 'file:///tmp/test-123']])
  dateNowMock.mockRestore()
})

test('getTmpDir: file scheme keeps existing file protocol', async () => {
  const dateNowMock = jest.spyOn(Date, 'now').mockReturnValue(123)
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.mkdir'() {
      return undefined
    },
    'PlatformPaths.getTmpDir'() {
      return 'file:///tmp'
    },
  })

  const tmpDir: string = await FileSystem.getTmpDir({ scheme: 'file' })
  expect(tmpDir).toBe('file:///tmp/test-123')
  expect(mockRpc.invocations).toEqual([['PlatformPaths.getTmpDir'], ['FileSystem.mkdir', 'file:///tmp/test-123']])
  dateNowMock.mockRestore()
})

test('getTmpDir: default scheme uses platform tmp dir', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'PlatformPaths.getTmpDir'() {
      return '/tmp/fallback'
    },
  })

  const tmpDir: string = await FileSystem.getTmpDir({ scheme: 'vscode-test' as any })
  expect(tmpDir).toBe('/tmp/fallback')
  expect(mockRpc.invocations).toEqual([['PlatformPaths.getTmpDir']])
})

test('getOpfsRoot', async () => {
  const mockDirectory = {
    async getFileHandle(): Promise<never> {
      throw new Error('should not be called')
    },
  }

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

  const root = await FileSystem.getOpfsRoot()

  expect(root).toBe(mockDirectory)
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

test('shouldHaveFolder', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes'() {
      return [{ name: 'dir', type: DirentType.Directory }]
    },
  })

  await FileSystem.shouldHaveFolder('memfs:///dir')
  expect(mockRpc.invocations).toEqual([['FileSystem.readDirWithFileTypes', 'memfs:///']])
})

test('shouldHaveFolder throws when folder does not exist', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes'() {
      return []
    },
  })

  await expect(FileSystem.shouldHaveFolder('memfs:///dir')).rejects.toThrow('expected filesystem to have folder "memfs:///dir" but it was not found')
  expect(mockRpc.invocations).toEqual([['FileSystem.readDirWithFileTypes', 'memfs:///']])
})

test('shouldHaveFolder throws when entry is not a directory', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes'() {
      return [{ name: 'dir', type: DirentType.File }]
    },
  })

  await expect(FileSystem.shouldHaveFolder('memfs:///dir')).rejects.toThrow(
    `expected filesystem entry "memfs:///dir" to be a folder but it was type ${DirentType.File}`,
  )
  expect(mockRpc.invocations).toEqual([['FileSystem.readDirWithFileTypes', 'memfs:///']])
})

test('createExecutable', async () => {
  const dateNowMock = jest.spyOn(Date, 'now').mockReturnValue(123)
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.chmod'() {
      return undefined
    },
    'FileSystem.mkdir'() {
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

  expect(path).toBe('file:///tmp/test-123/git')
  expect(mockRpc.invocations).toEqual([
    ['PlatformPaths.getTmpDir'],
    ['FileSystem.mkdir', 'file:///tmp/test-123'],
    ['PlatformPaths.getNodePath'],
    ['FileSystem.writeFile', 'file:///tmp/test-123/git', "#!/usr/bin/node\n  console.log('hi')"],
    ['FileSystem.chmod', 'file:///tmp/test-123/git', '755'],
  ])
  dateNowMock.mockRestore()
})

test('createExecutableFrom', async () => {
  const dateNowMock = jest.spyOn(Date, 'now').mockReturnValue(123)
  using mockRpc = RendererWorker.registerMockRpc({
    'Ajax.getText'() {
      return "console.log('ok')"
    },
    'FileSystem.chmod'() {
      return undefined
    },
    'FileSystem.mkdir'() {
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
  expect(path).toBe('file:///tmp/test-123/git')
  expect(mockRpc.invocations).toEqual([
    ['PlatformPaths.getTestPath'],
    ['Ajax.getText', '/tests/fixtures/script.js'],
    ['PlatformPaths.getTmpDir'],
    ['FileSystem.mkdir', 'file:///tmp/test-123'],
    ['PlatformPaths.getNodePath'],
    ['FileSystem.writeFile', 'file:///tmp/test-123/git', "#!/usr/bin/node\n  console.log('ok')"],
    ['FileSystem.chmod', 'file:///tmp/test-123/git', '755'],
  ])
  dateNowMock.mockRestore()
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

test('loadFixture throws when url is not a string', async () => {
  await expect(FileSystem.loadFixture(PlatformType.Web, undefined as any)).rejects.toThrow(new TypeError('fixture url must be of type string'))
})

test('loadFixture uses web file map on web platform', async () => {
  jest.resetModules()
  const getFileMapWeb = jest.fn(async () => ({ 'memfs:///file.txt': 'web-content' }))
  const getFileMapNode = jest.fn(async () => ({ 'memfs:///file.txt': 'node-content' }))
  const loadFixtureToMemFs = jest.fn(async () => 'memfs:///workspace/web-fixture')

  jest.unstable_mockModule('../src/parts/GetFileMapWeb/GetFileMapWeb.ts', () => ({
    getFileMapWeb,
  }))
  jest.unstable_mockModule('../src/parts/GetFileMapNode/GetFileMapNode.ts', () => ({
    getFileMapNode,
  }))
  jest.unstable_mockModule('../src/parts/LoadFixtureToMemFs/LoadFixtureToMemFs.ts', () => ({
    loadFixtureToMemFs,
  }))

  const fileSystemModule = await import('../src/parts/TestFrameWorkComponentFileSystem/TestFrameWorkComponentFileSystem.ts')
  const result = await fileSystemModule.loadFixture(PlatformType.Web, 'fixtures/sample')

  expect(result).toBe('memfs:///workspace/web-fixture')
  expect(getFileMapWeb).toHaveBeenCalledWith('fixtures/sample')
  expect(getFileMapNode).not.toHaveBeenCalled()
  expect(loadFixtureToMemFs).toHaveBeenCalledWith({ 'memfs:///file.txt': 'web-content' })
})

test('loadFixture uses node file map on non-web platform', async () => {
  jest.resetModules()
  const getFileMapWeb = jest.fn(async () => ({ 'memfs:///file.txt': 'web-content' }))
  const getFileMapNode = jest.fn(async () => ({ 'memfs:///file.txt': 'node-content' }))
  const loadFixtureToMemFs = jest.fn(async () => 'memfs:///workspace/node-fixture')

  jest.unstable_mockModule('../src/parts/GetFileMapWeb/GetFileMapWeb.ts', () => ({
    getFileMapWeb,
  }))
  jest.unstable_mockModule('../src/parts/GetFileMapNode/GetFileMapNode.ts', () => ({
    getFileMapNode,
  }))
  jest.unstable_mockModule('../src/parts/LoadFixtureToMemFs/LoadFixtureToMemFs.ts', () => ({
    loadFixtureToMemFs,
  }))

  const fileSystemModule = await import('../src/parts/TestFrameWorkComponentFileSystem/TestFrameWorkComponentFileSystem.ts')
  const result = await fileSystemModule.loadFixture(PlatformType.Remote, 'fixtures/sample')

  expect(result).toBe('memfs:///workspace/node-fixture')
  expect(getFileMapNode).toHaveBeenCalledWith('fixtures/sample')
  expect(getFileMapWeb).not.toHaveBeenCalled()
  expect(loadFixtureToMemFs).toHaveBeenCalledWith({ 'memfs:///file.txt': 'node-content' })
})

test('loadFixture - invalid url', async () => {
  const url = undefined
  // @ts-expect-error
  await expect(FileSystem.loadFixture(PlatformType.Remote, url)).rejects.toThrow(new Error(`fixture url must be of type string`))
})
