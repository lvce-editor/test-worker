export interface OriginPrivateFileSystem {
  [Symbol.asyncDispose](): Promise<void>
  getDirectoryHandle(name: string, options?: FileSystemGetDirectoryOptions): Promise<FileSystemDirectoryHandle>
  getFileHandle(name: string, options?: FileSystemGetFileOptions): Promise<FileSystemFileHandle>
}

export const create = async (): Promise<OriginPrivateFileSystem> => {
  const root = await navigator.storage.getDirectory()
  const entries = new Set<string>()
  let disposed = false
  return {
    async getDirectoryHandle(name: string, options?: FileSystemGetDirectoryOptions): Promise<FileSystemDirectoryHandle> {
      const handle = await root.getDirectoryHandle(name, options)
      if (options?.create) {
        entries.add(name)
      }
      return handle
    },
    async getFileHandle(name: string, options?: FileSystemGetFileOptions): Promise<FileSystemFileHandle> {
      const handle = await root.getFileHandle(name, options)
      if (options?.create) {
        entries.add(name)
      }
      return handle
    },
    async [Symbol.asyncDispose](): Promise<void> {
      if (disposed) {
        return
      }
      disposed = true
      for (const name of entries) {
        try {
          await root.removeEntry(name, { recursive: true })
        } catch (error) {
          if (!(error instanceof DOMException) || error.name !== 'NotFoundError') {
            throw error
          }
        }
      }
    },
  }
}
