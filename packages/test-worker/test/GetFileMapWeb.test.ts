import { afterEach, expect, jest, test } from '@jest/globals'

const loadFileMap = jest.fn(async (_url: string) => ({
  'file.txt': 'content',
}))

jest.unstable_mockModule('../src/parts/LoadFileMap/LoadFileMap.ts', () => ({
  loadFileMap,
}))

const { getFileMapWeb } = await import('../src/parts/GetFileMapWeb/GetFileMapWeb.ts')

afterEach(() => {
  loadFileMap.mockClear()
})

test('getFileMapWeb loads fileMap.json from the fixture url', async () => {
  const result = await getFileMapWeb('http://localhost:3000/fixtures/basic')

  expect(result).toEqual({
    'file.txt': 'content',
  })
  expect(loadFileMap).toHaveBeenCalledWith('http://localhost:3000/fixtures/basic/fileMap.json')
})
