import { expect, test, jest, afterEach } from '@jest/globals'
import { VError } from '@lvce-editor/verror'
import type { FileMap } from '../src/parts/FileMap/FileMap.ts'
import { loadFileMap } from '../src/parts/LoadFileMap/LoadFileMap.ts'

// Mock fetch globally
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>
;(globalThis as any).fetch = mockFetch

test('loadFileMap - successful load', async () => {
  const mockFileMap: FileMap = {
    'src/file1.ts': 'content1',
    'src/file2.ts': 'content2',
    'test/test1.test.ts': 'test content',
  }

  const mockResponse = new Response(JSON.stringify(mockFileMap), {
    status: 200,
    statusText: 'OK',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)

  const result = await loadFileMap('http://localhost:3000/fileMap.json')

  expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/fileMap.json')
  expect(result).toEqual(mockFileMap)
})

test('loadFileMap - 404 error', async () => {
  const mockResponse = new Response('Not Found', {
    status: 404,
    statusText: 'Not Found',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)

  await expect(loadFileMap('http://localhost:3000/nonexistent.json')).rejects.toThrow(
    'Failed to load file map from http://localhost:3000/nonexistent.json',
  )
})

test('loadFileMap - 500 error', async () => {
  const mockResponse = new Response('Internal Server Error', {
    status: 500,
    statusText: 'Internal Server Error',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)

  await expect(loadFileMap('http://localhost:3000/fileMap.json')).rejects.toThrow('Failed to load file map from http://localhost:3000/fileMap.json')
})

test('loadFileMap - network error', async () => {
  mockFetch.mockRejectedValueOnce(new Error('Network error'))

  await expect(loadFileMap('http://localhost:3000/fileMap.json')).rejects.toThrow('Failed to load file map from http://localhost:3000/fileMap.json')
})

test('loadFileMap - JSON parsing error', async () => {
  const mockResponse = new Response('invalid json', {
    status: 200,
    statusText: 'OK',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)

  await expect(loadFileMap('http://localhost:3000/fileMap.json')).rejects.toThrow('Failed to load file map from http://localhost:3000/fileMap.json')
})

test('loadFileMap - empty file map', async () => {
  const emptyFileMap: FileMap = {}
  const mockResponse = new Response(JSON.stringify(emptyFileMap), {
    status: 200,
    statusText: 'OK',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)

  const result = await loadFileMap('http://localhost:3000/fileMap.json')

  expect(result).toEqual({})
})

test('loadFileMap - file map with special characters in paths', async () => {
  const fileMapWithSpecialChars: FileMap = {
    'src/file with spaces.ts': 'content with spaces',
    'src/file-with-dashes.ts': 'content with dashes',
    'src/file_with_underscores.ts': 'content with underscores',
    'src/file.with.dots.ts': 'content with dots',
    'src/中文文件名.ts': '中文内容',
  }

  const mockResponse = new Response(JSON.stringify(fileMapWithSpecialChars), {
    status: 200,
    statusText: 'OK',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)

  const result = await loadFileMap('http://localhost:3000/fileMap.json')

  expect(result).toEqual(fileMapWithSpecialChars)
})

test('loadFileMap - file map with empty content', async () => {
  const fileMapWithEmptyContent: FileMap = {
    'src/empty.ts': '',
    'src/normal.ts': 'normal content',
  }

  const mockResponse = new Response(JSON.stringify(fileMapWithEmptyContent), {
    status: 200,
    statusText: 'OK',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)

  const result = await loadFileMap('http://localhost:3000/fileMap.json')

  expect(result).toEqual(fileMapWithEmptyContent)
})

test('loadFileMap - different URL formats', async () => {
  const mockFileMap: FileMap = { 'test.ts': 'content' }

  const mockResponse = new Response(JSON.stringify(mockFileMap), {
    status: 200,
    statusText: 'OK',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)

  const httpsUrl = 'https://example.com/fileMap.json'
  await loadFileMap(httpsUrl)

  expect(mockFetch).toHaveBeenCalledWith(httpsUrl)
})

test('loadFileMap - VError contains original error and URL context', async () => {
  const testUrl = 'http://localhost:3000/test.json'
  const originalError = new Error('Network error')
  mockFetch.mockRejectedValueOnce(originalError)

  await expect(loadFileMap(testUrl)).rejects.toThrow('Failed to load file map from http://localhost:3000/test.json')
})

test('loadFileMap - throws error when JSON is null', async () => {
  const mockResponse = new Response(JSON.stringify(null), {
    status: 200,
    statusText: 'OK',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)

  await expect(loadFileMap('http://localhost:3000/fileMap.json')).rejects.toThrow('Failed to load file map from http://localhost:3000/fileMap.json')
})

test('loadFileMap - throws error when JSON is a number', async () => {
  const mockResponse = new Response(JSON.stringify(42), {
    status: 200,
    statusText: 'OK',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)

  await expect(loadFileMap('http://localhost:3000/fileMap.json')).rejects.toThrow('Failed to load file map from http://localhost:3000/fileMap.json')
})

test('loadFileMap - throws error when JSON is an array', async () => {
  const mockResponse = new Response(JSON.stringify(['file1.ts', 'file2.ts']), {
    status: 200,
    statusText: 'OK',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)

  await expect(loadFileMap('http://localhost:3000/fileMap.json')).rejects.toThrow('Failed to load file map from http://localhost:3000/fileMap.json')
})

test('loadFileMap - throws error when JSON is a string', async () => {
  const mockResponse = new Response(JSON.stringify('not a file map'), {
    status: 200,
    statusText: 'OK',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)

  await expect(loadFileMap('http://localhost:3000/fileMap.json')).rejects.toThrow('Failed to load file map from http://localhost:3000/fileMap.json')
})

test('loadFileMap - throws error when JSON is a boolean', async () => {
  const mockResponse = new Response(JSON.stringify(true), {
    status: 200,
    statusText: 'OK',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)

  await expect(loadFileMap('http://localhost:3000/fileMap.json')).rejects.toThrow('Failed to load file map from http://localhost:3000/fileMap.json')
})

test('loadFileMap - throws error when JSON has non-string values', async () => {
  const invalidFileMap = {
    'src/file1.ts': 123, // number instead of string
    'src/file2.ts': 'valid content',
  }
  const mockResponse = new Response(JSON.stringify(invalidFileMap), {
    status: 200,
    statusText: 'OK',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)

  await expect(loadFileMap('http://localhost:3000/fileMap.json')).rejects.toThrow('Failed to load file map from http://localhost:3000/fileMap.json')
})

test('loadFileMap - accepts numeric keys as strings (JSON behavior)', async () => {
  const fileMapWithNumericKeys = {
    123: 'content', // number key becomes string "123" in JSON
    'src/file2.ts': 'valid content',
  }
  const mockResponse = new Response(JSON.stringify(fileMapWithNumericKeys), {
    status: 200,
    statusText: 'OK',
  })
  mockFetch.mockResolvedValueOnce(mockResponse)

  const result = await loadFileMap('http://localhost:3000/fileMap.json')

  expect(result).toEqual({
    '123': 'content',
    'src/file2.ts': 'valid content',
  })
})

// Reset mocks after each test
afterEach(() => {
  jest.clearAllMocks()
})
