import { expect, test } from '@jest/globals'
import * as OriginPrivateFileSystem from '../src/parts/TestFrameWorkComponentOriginPrivateFileSystem/TestFrameWorkComponentOriginPrivateFileSystem.ts'

const withNavigatorStorage = async (root: FileSystemDirectoryHandle, callback: () => Promise<void>): Promise<void> => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator')
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { storage: { getDirectory: async () => root } } })
  try {
    await callback()
  } finally {
    if (descriptor) {
      Object.defineProperty(globalThis, 'navigator', descriptor)
    } else {
      Object.defineProperty(globalThis, 'navigator', { configurable: true, value: undefined })
    }
  }
}

test('create returns root and disposes only entries created through it', async () => {
  const removed: string[] = []
  const nested = {
    async getFileHandle() {
      return { kind: 'file', name: 'nested.txt' }
    },
    kind: 'directory',
    name: 'created-folder',
  } as unknown as FileSystemDirectoryHandle
  const root = {
    async getDirectoryHandle() {
      return nested
    },
    async getFileHandle() {
      return { kind: 'file', name: 'created.txt' }
    },
    kind: 'directory',
    name: '',
    async removeEntry(name: string) {
      removed.push(name)
    },
  } as unknown as FileSystemDirectoryHandle
  await withNavigatorStorage(root, async () => {
    const opfs = await OriginPrivateFileSystem.create()
    await opfs.getFileHandle('created.txt', { create: true })
    await opfs.getDirectoryHandle('created-folder', { create: true })
    await opfs.getFileHandle('existing.txt')
    await opfs.getDirectoryHandle('existing-folder')
    await opfs[Symbol.asyncDispose]()
    await opfs[Symbol.asyncDispose]()
    expect(new Set(removed)).toEqual(new Set(['created-folder', 'created.txt']))
  })
})

test('disposal ignores entries that are already absent', async () => {
  const root = {
    async getFileHandle() {
      return { kind: 'file', name: 'missing.txt' }
    },
    kind: 'directory',
    name: '',
    async removeEntry() {
      throw new DOMException('missing', 'NotFoundError')
    },
  } as unknown as FileSystemDirectoryHandle
  await withNavigatorStorage(root, async () => {
    const opfs = await OriginPrivateFileSystem.create()
    await opfs.getFileHandle('missing.txt', { create: true })
    await expect(opfs[Symbol.asyncDispose]()).resolves.toBeUndefined()
  })
})

test('disposal reports failures other than missing entries', async () => {
  const root = {
    async getFileHandle() {
      return { kind: 'file', name: 'locked.txt' }
    },
    kind: 'directory',
    name: '',
    async removeEntry() {
      throw new DOMException('denied', 'NoModificationAllowedError')
    },
  } as unknown as FileSystemDirectoryHandle
  await withNavigatorStorage(root, async () => {
    const opfs = await OriginPrivateFileSystem.create()
    await opfs.getFileHandle('locked.txt', { create: true })
    await expect(opfs[Symbol.asyncDispose]()).rejects.toThrow('denied')
  })
})

test('disposal reports non-DOM cleanup errors', async () => {
  const root = {
    async getFileHandle() {
      return { kind: 'file', name: 'failed.txt' }
    },
    kind: 'directory',
    name: '',
    async removeEntry() {
      throw new Error('failed')
    },
  } as unknown as FileSystemDirectoryHandle
  await withNavigatorStorage(root, async () => {
    const opfs = await OriginPrivateFileSystem.create()
    await opfs.getFileHandle('failed.txt', { create: true })
    await expect(opfs[Symbol.asyncDispose]()).rejects.toThrow('failed')
  })
})
