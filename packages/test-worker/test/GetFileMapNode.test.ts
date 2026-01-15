import { expect, test } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetFileMapNode from '../src/parts/GetFileMapNode/GetFileMapNode.js'

test('getFileMapNode function exists and is exported', () => {
  expect(GetFileMapNode.getFileMapNode).toBeDefined()
  expect(typeof GetFileMapNode.getFileMapNode).toBe('function')
})

test('getFileMapNode handles empty directory', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes'() {
      return []
    },
  })

  const result = await GetFileMapNode.getFileMapNode('http://localhost:3000/remote/test/path')
  expect(typeof result).toBe('object')
  expect(Object.keys(result)).toHaveLength(0)

  // Verify the RPC was called
  expect(mockRpc.invocations).toEqual([['FileSystem.readDirWithFileTypes', 'file:///test/path']])
})

test('getFileMapNode handles directory with files', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes'(path: string) {
      if (path === 'file:///test/path') {
        return [
          { name: 'file1.txt', type: DirentType.File },
          { name: 'file2.js', type: DirentType.File },
        ]
      }
      return []
    },
    'FileSystem.readFile'(path: string) {
      if (path === 'file:///test/path/file1.txt') {
        return 'content of file1'
      }
      if (path === 'file:///test/path/file2.js') {
        return 'content of file2'
      }
      return ''
    },
  })

  const result = await GetFileMapNode.getFileMapNode('http://localhost:3000/remote/test/path')
  expect(typeof result).toBe('object')
  expect(result['file1.txt']).toBe('content of file1')
  expect(result['file2.js']).toBe('content of file2')

  // Verify the RPC calls were made
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.readDirWithFileTypes', 'file:///test/path'],
    ['FileSystem.readFile', 'file:///test/path/file1.txt'],
    ['FileSystem.readFile', 'file:///test/path/file2.js'],
  ])
})

test('getFileMapNode handles nested directories', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes'(path: string) {
      if (path === 'file:///test/path') {
        return [
          { name: 'subdir', type: DirentType.Directory },
          { name: 'file.txt', type: DirentType.File },
        ]
      }
      if (path === 'file:///test/path/subdir') {
        return [{ name: 'nested.txt', type: DirentType.File }]
      }
      return []
    },
    'FileSystem.readFile'(path: string) {
      if (path === 'file:///test/path/file.txt') {
        return 'root file content'
      }
      if (path === 'file:///test/path/subdir/nested.txt') {
        return 'nested file content'
      }
      return ''
    },
  })

  const result = await GetFileMapNode.getFileMapNode('http://localhost:3000/remote/test/path')
  expect(typeof result).toBe('object')
  expect(result['file.txt']).toBe('root file content')
  expect(result['subdir/nested.txt']).toBe('nested file content')

  // Verify the RPC calls were made
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.readDirWithFileTypes', 'file:///test/path'],
    ['FileSystem.readDirWithFileTypes', 'file:///test/path/subdir'],
    ['FileSystem.readFile', 'file:///test/path/subdir/nested.txt'],
    ['FileSystem.readFile', 'file:///test/path/file.txt'],
  ])
})

test('getFileMapNode handles different url formats', async () => {
  const urls = ['http://localhost:3000/remote/test/path', 'https://example.com/remote/absolute/path']

  for (const url of urls) {
    using mockRpc = RendererWorker.registerMockRpc({
      'FileSystem.readDirWithFileTypes'() {
        return []
      },
    })

    const result = await GetFileMapNode.getFileMapNode(url)
    expect(typeof result).toBe('object')

    // Verify the RPC was called
    expect(mockRpc.invocations).toHaveLength(1)
    expect(mockRpc.invocations[0][0]).toBe('FileSystem.readDirWithFileTypes')
  }
})
