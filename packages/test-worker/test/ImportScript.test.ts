import { expect, test } from '@jest/globals'
import * as ImportScript from '../src/parts/ImportScript/ImportScript.ts'

test('importScript: success', async () => {
  const url = 'data:text/javascript,export default 1; export const a = 1;'
  const mod: any = await ImportScript.importScript(url)
  expect(mod.a).toBe(1)
})

test('importScript: failure', async () => {
  await expect(ImportScript.importScript('/does-not-exist.js')).rejects.toBeTruthy()
})
