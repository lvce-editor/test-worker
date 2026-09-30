import { expect, jest, test } from '@jest/globals'

const invoke = jest.fn(async () => undefined)
const dispose = jest.fn(async () => undefined)
const create = jest.fn(async (_options?: unknown) => ({ dispose, invoke }))

jest.unstable_mockModule('@lvce-editor/rpc', () => ({
  ModuleWorkerRpcParent: { create },
}))

const CacheWorker = await import('../src/CacheWorker.ts')

test('create wraps cache worker RPC commands and disposes the worker', async () => {
  const url = new URL('https://example.test/cacheWorkerMain.js')
  const cacheWorker = await CacheWorker.create(url)

  expect(create).toHaveBeenCalledWith({ commandMap: {}, url: url.href })
  await cacheWorker.getCacheStorageItem('/key', 'cache')
  await cacheWorker.setCacheStorageItem('/key', 'value', 'cache')
  await cacheWorker.removeCacheStorageItem('/key', 'cache')
  await cacheWorker.addIndexedDbFileHandle('key', { name: 'value' }, 'database')
  await cacheWorker.getIndexedDbFileHandle('key', 'database')
  await cacheWorker.removeIndexedDbFileHandle('key', 'database')
  await cacheWorker.readFile('file')
  await cacheWorker.writeFile('file', 'value')
  await cacheWorker.removeFile('file')
  await cacheWorker.dispose()

  expect(invoke.mock.calls).toEqual([
    ['Cache.getCacheStorageItem', '/key', 'cache', undefined, undefined],
    ['Cache.setCacheStorageItem', '/key', 'value', 'cache', undefined, undefined, undefined],
    ['Cache.removeCacheStorageItem', '/key', 'cache', undefined, undefined],
    ['IndexedDb.addIndexedDbFileHandle', 'key', { name: 'value' }, 'database'],
    ['IndexedDb.getIndexedDbFileHandle', 'key', 'database'],
    ['IndexedDb.removeIndexedDbFileHandle', 'key', 'database'],
    ['Opfs.readFile', 'file'],
    ['Opfs.writeFile', 'file', 'value'],
    ['Opfs.removeFile', 'file'],
  ])
  expect(dispose).toHaveBeenCalledTimes(1)
})
