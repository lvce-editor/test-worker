import { DirentType, PlatformType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { DroppedFileHandle } from '../DroppedFileHandle/DroppedFileHandle.ts'
import type { FileSystemTmpDirOptions } from '../FileSystemTmpDirOptions/FileSystemTmpDirOptions.ts'
import { AssertionError } from '../AssertionError/AssertionError.ts'
import * as FileSystemProtocol from '../FileSystemProtocol/FileSystemProtocol.ts'
import { getFileMapNode } from '../GetFileMapNode/GetFileMapNode.ts'
import { getFileMapWeb } from '../GetFileMapWeb/GetFileMapWeb.ts'
import { loadFixtureToMemFs } from '../LoadFixtureToMemFs/LoadFixtureToMemFs.ts'
import * as PathSeparatorType from '../PathSeparatorType/PathSeparatorType.ts'
import { stringifyJson } from '../StringifyJson/StringifyJson.ts'

export const writeFile = async (uri: string, content: string): Promise<void> => {
  await RendererWorker.invoke('FileSystem.writeFile', uri, content)
}

export const writeJson = async (uri: string, data: any): Promise<void> => {
  const content = stringifyJson(data)
  await writeFile(uri, content)
}

export const readFile = async (uri: string): Promise<string> => {
  return RendererWorker.invoke('FileSystem.readFile', uri)
}

export const addFileHandle = async (file: File | FileSystemHandle): Promise<void> => {
  return RendererWorker.invoke('FileSystem.addFileHandle', file)
}

export const registerFileHandle = async (fileHandle: FileSystemHandle): Promise<number> => {
  return RendererWorker.invoke('FileSystemHandle.addFileHandle', fileHandle)
}

export const getDirectoryHandle = async (uri: string): Promise<FileSystemDirectoryHandle> => {
  return RendererWorker.invoke('FileSystemHandle.getDirectoryHandle', uri)
}

export const removeFileHandle = async (id: number): Promise<void> => {
  await RendererWorker.invoke('FileSystemHandle.removeFileHandle', id)
}

export const mkdir = async (uri: string): Promise<void> => {
  return RendererWorker.invoke('FileSystem.mkdir', uri)
}

export interface FileItem {
  readonly content: string
  readonly uri: string
}

export const writeFiles = async (files: readonly FileItem[]): Promise<void> => {
  // TODO maybe have a method to send all the files to file system worker directly
  await Promise.all(
    files.map((file) => {
      return writeFile(file.uri, file.content)
    }),
  )
}

export const setFiles = async (files: readonly FileItem[]): Promise<void> => {
  await writeFiles(files)
}

export interface Dirent {
  readonly name: string
  readonly type: number
}

export const readDir = async (uri: string): Promise<readonly Dirent[]> => {
  return RendererWorker.invoke('FileSystem.readDirWithFileTypes', uri)
}

const getParentUri = (uri: string): string => {
  const url = new URL(uri)
  const pathSegments = url.pathname.split('/').filter(Boolean)
  pathSegments.pop()
  url.pathname = pathSegments.length === 0 ? '/' : `/${pathSegments.join('/')}`
  return url.href
}

const getBaseName = (uri: string): string => {
  const url = new URL(uri)
  const pathSegments = url.pathname.split('/').filter(Boolean)
  return pathSegments.at(-1) || ''
}

export const shouldHaveFolder = async (uri: string): Promise<void> => {
  const parentUri = getParentUri(uri)
  const folderName = getBaseName(uri)
  const dirents = await readDir(parentUri)
  const matchingDirent = dirents.find((dirent) => dirent.name === folderName)
  if (!matchingDirent) {
    throw new AssertionError(`expected filesystem to have folder "${uri}" but it was not found`)
  }
  if (matchingDirent.type !== DirentType.Directory) {
    throw new AssertionError(`expected filesystem entry "${uri}" to be a folder but it was type ${matchingDirent.type}`)
  }
}

export const shouldHaveFile = async (uri: string, expectedContent: string): Promise<void> => {
  const parentUri = getParentUri(uri)
  const fileName = getBaseName(uri)
  const dirents = await readDir(parentUri)
  const matchingDirent = dirents.find((dirent) => dirent.name === fileName)
  if (!matchingDirent) {
    throw new AssertionError(`expected filesystem to have file "${uri}" but it was not found`)
  }
  if (matchingDirent.type !== DirentType.File) {
    throw new AssertionError(`expected filesystem entry "${uri}" to be a file but it was type ${matchingDirent.type}`)
  }
  const actualContent = await readFile(uri)
  if (actualContent !== expectedContent) {
    throw new AssertionError(`expected file "${uri}" to have content "${expectedContent}" but got "${actualContent}"`)
  }
}

export const remove = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('FileSystem.remove', uri)
}

export const deleteFile = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('FileSystem.deleteFile', uri)
}

export const rename = async (oldUri: string, newUri: string): Promise<void> => {
  await RendererWorker.invoke('FileSystem.rename', oldUri, newUri)
}

export const setProviderError = async (enabled: boolean): Promise<void> => {
  await RendererWorker.invoke('FileSystemProvider.setError', enabled)
}

export const setProviderInvalidData = async (enabled: boolean): Promise<void> => {
  await RendererWorker.invoke('FileSystemProvider.setInvalidData', enabled)
}

export const setReadOnly = async (uri: string, readOnly: boolean): Promise<void> => {
  await RendererWorker.invoke('FileSystem.setReadOnly', uri, readOnly)
}

export const symlink = async (target: string, path: string): Promise<void> => {
  await RendererWorker.invoke('FileSystem.symlink', target, path)
}

const windowsPathRegex = /^[A-Za-z]:\//

const toFileUri = (path: string): string => {
  if (path.startsWith('file://')) {
    return path
  }
  const normalizedPath = path.replaceAll('\\', '/')
  if (windowsPathRegex.test(normalizedPath)) {
    return `file:///${normalizedPath}`
  }
  return `file://${normalizedPath}`
}

const getTmpDirFileScheme = async (): Promise<string> => {
  const tmpFolder = await RendererWorker.invoke('PlatformPaths.getTmpDir')
  const tmpUri = toFileUri(tmpFolder)
  const uri = `${tmpUri}/test-${Date.now()}`
  await mkdir(uri)
  return uri
}

export const getTmpDir = async ({ scheme = FileSystemProtocol.Memfs }: FileSystemTmpDirOptions = {}): Promise<string> => {
  switch (scheme) {
    case 'file':
      return getTmpDirFileScheme()
    case FileSystemProtocol.Memfs:
      return 'memfs:///workspace'
    default:
      return RendererWorker.invoke('PlatformPaths.getTmpDir')
  }
}

export const chmod = async (uri: string, permissions: any): Promise<void> => {
  await RendererWorker.invoke('FileSystem.chmod', uri, permissions)
}

export const createExecutable = async (content: string): Promise<string> => {
  const tmpDir = await getTmpDir({ scheme: 'file' })

  const nodePath = await RendererWorker.invoke('PlatformPaths.getNodePath')
  const gitPath = `${tmpDir}/git`
  await writeFile(
    gitPath,
    `#!${nodePath}
  ${content}`,
  )
  await chmod(gitPath, '755')
  return gitPath
}

export const createExecutableFrom = async (uri: string): Promise<string> => {
  const testPath = await RendererWorker.invoke('PlatformPaths.getTestPath')
  const absolutePath = testPath + PathSeparatorType.Slash + uri

  const content = await RendererWorker.invoke('Ajax.getText', absolutePath)
  return createExecutable(content)
}

export const getOpfsRoot = async (): Promise<FileSystemDirectoryHandle> => {
  return navigator.storage.getDirectory()
}

export const createDroppedFileHandle = async (): Promise<DroppedFileHandle> => {
  const directory = await getOpfsRoot()
  const fileHandle = await directory.getFileHandle('dropped-file.txt', {
    create: true,
  })
  const file = await fileHandle.getFile()

  const id = await RendererWorker.invoke('FileSystemHandle.addFileHandle', fileHandle)
  return {
    file,
    id,
  }
}

export const loadFixture = async (platform: number, url: string): Promise<string> => {
  if (typeof url !== 'string') {
    throw new TypeError(`fixture url must be of type string`)
  }
  const fn = platform === PlatformType.Web ? getFileMapWeb : getFileMapNode
  const fileMap = await fn(url)
  const filePath = await loadFixtureToMemFs(fileMap)
  return filePath
}
