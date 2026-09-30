import { ModuleWorkerRpcParent, type Rpc } from '@lvce-editor/rpc'

export interface StorageBucketOptions {
  readonly expires?: number
  readonly quota?: number
}

export interface CacheStorageItem {
  readonly body: ArrayBuffer
  readonly headers: Readonly<Record<string, string>>
  readonly status: number
  readonly statusText: string
}

export type CacheStorageWriteResult =
  { readonly success: true } | { readonly success: false; readonly errorCode: 'CACHE_STORAGE_WRITE_FAILED'; readonly errorMessage: string }

export type CacheRequest = string | Readonly<URL> | Readonly<Request>

export interface CacheWorkerPageObject {
  readonly addIndexedDbFileHandle: (key: IDBValidKey, handle: unknown, databaseName?: string) => Promise<void>
  readonly dispose: () => Promise<void>
  readonly getCacheStorageItem: (
    request: CacheRequest,
    cacheName?: string,
    bucketName?: string,
    bucketOptions?: Readonly<StorageBucketOptions>,
  ) => Promise<CacheStorageItem | null>
  readonly getIndexedDbFileHandle: (key: IDBValidKey, databaseName?: string) => Promise<unknown>
  readonly readFile: (name: string) => Promise<string>
  readonly removeCacheStorageItem: (
    request: CacheRequest,
    cacheName?: string,
    bucketName?: string,
    bucketOptions?: Readonly<StorageBucketOptions>,
  ) => Promise<boolean>
  readonly removeFile: (name: string) => Promise<void>
  readonly removeIndexedDbFileHandle: (key: IDBValidKey, databaseName?: string) => Promise<void>
  readonly setCacheStorageItem: (
    request: CacheRequest,
    value: BodyInit,
    cacheName?: string,
    headers?: Readonly<Record<string, string>> | Readonly<Headers> | readonly (readonly [string, string])[],
    bucketName?: string,
    bucketOptions?: Readonly<StorageBucketOptions>,
  ) => Promise<CacheStorageWriteResult>
  readonly writeFile: (name: string, content: FileSystemWriteChunkType) => Promise<void>
}

export const create = async (url: string | URL): Promise<CacheWorkerPageObject> => {
  const rpc: Rpc = await ModuleWorkerRpcParent.create({ commandMap: {}, url: url.toString() })
  return {
    addIndexedDbFileHandle: (key, handle, databaseName) => rpc.invoke('IndexedDb.addIndexedDbFileHandle', key, handle, databaseName),
    dispose: () => rpc.dispose(),
    getCacheStorageItem: (request, cacheName, bucketName, bucketOptions) =>
      rpc.invoke('Cache.getCacheStorageItem', request, cacheName, bucketName, bucketOptions),
    getIndexedDbFileHandle: (key, databaseName) => rpc.invoke('IndexedDb.getIndexedDbFileHandle', key, databaseName),
    readFile: (name) => rpc.invoke('Opfs.readFile', name),
    removeCacheStorageItem: (request, cacheName, bucketName, bucketOptions) =>
      rpc.invoke('Cache.removeCacheStorageItem', request, cacheName, bucketName, bucketOptions),
    removeFile: (name) => rpc.invoke('Opfs.removeFile', name),
    removeIndexedDbFileHandle: (key, databaseName) => rpc.invoke('IndexedDb.removeIndexedDbFileHandle', key, databaseName),
    setCacheStorageItem: (request, value, cacheName, headers, bucketName, bucketOptions) =>
      rpc.invoke('Cache.setCacheStorageItem', request, value, cacheName, headers, bucketName, bucketOptions),
    writeFile: (name, content) => rpc.invoke('Opfs.writeFile', name, content),
  }
}
