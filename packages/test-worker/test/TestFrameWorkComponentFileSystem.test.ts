import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as FileSystem from '../src/parts/TestFrameWorkComponentFileSystem/TestFrameWorkComponentFileSystem.ts'

test('writeFile', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await FileSystem.writeFile('memfs:///file.txt', 'content')

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('FileSystem.writeFile', 'memfs:///file.txt', 'content')
})

test('writeJson', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await FileSystem.writeJson('memfs:///data.json', { a: 1 })

  const expected = '{\n  "a": 1\n}\n'
  expect(mockInvoke).toHaveBeenCalledWith('FileSystem.writeFile', 'memfs:///data.json', expected)
})

test('readFile', async () => {
  const mockInvoke = jest.fn<(...args: any[]) => Promise<any>>().mockResolvedValue('content')
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  const content: string = await FileSystem.readFile('memfs:///file.txt')
  expect(content).toBe('content')
  expect(mockInvoke).toHaveBeenCalledWith('FileSystem.readFile', 'memfs:///file.txt')
})

test('mkdir', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await FileSystem.mkdir('memfs:///dir')
  expect(mockInvoke).toHaveBeenCalledWith('FileSystem.mkdir', 'memfs:///dir')
})

test('remove', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await FileSystem.remove('memfs:///file.txt')
  expect(mockInvoke).toHaveBeenCalledWith('FileSystem.remove', 'memfs:///file.txt')
})

test('getTmpDir: memfs default', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  const tmpDir: string = await FileSystem.getTmpDir()
  expect(tmpDir).toBe('memfs:///workspace')
  expect(mockInvoke).not.toHaveBeenCalled()
})

test('getTmpDir: file scheme', async () => {
  const mockInvoke = jest.fn<(...args: any[]) => Promise<any>>().mockResolvedValue('/tmp')
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  const tmpDir: string = await FileSystem.getTmpDir({ scheme: 'file' })
  expect(tmpDir).toBe('/tmp')
  expect(mockInvoke).toHaveBeenCalledWith('PlatformPaths.getTmpDir')
})

test('chmod', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  await FileSystem.chmod('file:///bin', '755')
  expect(mockInvoke).toHaveBeenCalledWith('FileSystem.chmod', 'file:///bin', '755')
})

test('createExecutable', async () => {
  const mockInvoke = jest.fn<(...args: any[]) => Promise<any>>()
  // getTmpDir(file) => '/tmp', getNodePath => '/usr/bin/node'
  mockInvoke.mockResolvedValueOnce('/tmp')
  mockInvoke.mockResolvedValueOnce('/usr/bin/node')
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  const path: string = await FileSystem.createExecutable("console.log('hi')")

  expect(path).toBe('/tmp/git')
  expect(mockInvoke).toHaveBeenCalledWith('PlatformPaths.getTmpDir')
  expect(mockInvoke).toHaveBeenCalledWith('PlatformPaths.getNodePath')
  expect(mockInvoke).toHaveBeenCalledWith('FileSystem.writeFile', '/tmp/git', "#!/usr/bin/node\n  console.log('hi')")
  expect(mockInvoke).toHaveBeenCalledWith('FileSystem.chmod', '/tmp/git', '755')
})

test('createExecutableFrom', async () => {
  const mockInvoke = jest.fn<(...args: any[]) => Promise<any>>()
  mockInvoke.mockResolvedValueOnce('/tests') // getTestPath
  mockInvoke.mockResolvedValueOnce("console.log('ok')") // Ajax.getText
  mockInvoke.mockResolvedValueOnce('/tmp') // getTmpDir
  mockInvoke.mockResolvedValueOnce('/usr/bin/node') // getNodePath
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: mockInvoke })
  RendererWorker.set(mockRpc)

  const path: string = await FileSystem.createExecutableFrom('fixtures/script.js')
  expect(path).toBe('/tmp/git')
  expect(mockInvoke).toHaveBeenCalledWith('PlatformPaths.getTestPath')
  expect(mockInvoke).toHaveBeenCalledWith('Ajax.getText', '/tests/fixtures/script.js')
})
