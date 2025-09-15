import { expect, test } from '@jest/globals'

const ImportTest = await import('../src/parts/ImportTest/ImportTest.ts')

const toBase64 = (text: string): string => {
  const base64 = btoa(text)
  return `data:text/javascript;base64,${base64}`
}

// success

test('importTest: success returns module', async () => {
  const validModuleCode = 'export const a = 1; export const b = 2;'
  const dataUrl = toBase64(validModuleCode)

  const result = await ImportTest.importTest(dataUrl)
  expect(result.a).toBe(1)
  expect(result.b).toBe(2)
  expect(Object.keys(result)).toEqual(['a', 'b'])
})

// error wraps

test('importTest: error wraps with VError message', async () => {
  const invalidModuleCode = 'export const a = 1; export const b = 2; invalid syntax here'
  const dataUrl = toBase64(invalidModuleCode)

  await expect(ImportTest.importTest(dataUrl)).rejects.toMatchObject({
    message: expect.stringContaining('Failed to import test'),
  })
})
