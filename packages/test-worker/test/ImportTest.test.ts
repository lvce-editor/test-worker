import { expect, jest, test } from '@jest/globals'

jest.unstable_mockModule('../src/parts/ImportScript/ImportScript.ts', () => ({
  importScript: jest.fn(),
}))

const ImportScript = await import('../src/parts/ImportScript/ImportScript.ts')
const ImportTest = await import('../src/parts/ImportTest/ImportTest.ts')

// success

test('importTest: success returns module', async () => {
  const mod = { a: 1 }
  ;(ImportScript.importScript as any).mockResolvedValue(mod as any)
  const result = await ImportTest.importTest('file:///tmp/test.js')
  expect(ImportScript.importScript).toHaveBeenCalledWith('file:///tmp/test.js')
  expect(result).toBe(mod)
})

// error wraps

test('importTest: error wraps with VError message', async () => {
  ;(ImportScript.importScript as any).mockRejectedValue(new Error('enoent'))
  await expect(ImportTest.importTest('file:///tmp/missing.js')).rejects.toMatchObject({
    message: 'Failed to import test: enoent',
  })
})
