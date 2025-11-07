 
import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { DroppedFileHandle } from '../DroppedFileHandle/DroppedFileHandle.ts'
import type { FileSystemTmpDirOptions } from '../FileSystemTmpDirOptions/FileSystemTmpDirOptions.ts'
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

export const addFileHandle = async (file: File): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('FileSystem.addFileHandle', file)
}

export const mkdir = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('FileSystem.mkdir', uri)
}

export const readDir = async (uri: string): Promise<void> => {
  // @ts-ignore
  return RendererWorker.invoke('FileSystem.readDirWithFileTypes', uri)
}

export const remove = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('FileSystem.remove', uri)
}

export const getTmpDir = async ({ scheme = FileSystemProtocol.Memfs }: FileSystemTmpDirOptions = {}): Promise<string> => {
  switch (scheme) {
    case FileSystemProtocol.Memfs:
      return 'memfs:///workspace'
    default:
      // @ts-ignore
      return RendererWorker.invoke('PlatformPaths.getTmpDir')
  }
}

export const chmod = async (uri: string, permissions: any): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('FileSystem.chmod', uri, permissions)
}

export const createExecutable = async (content: string): Promise<string> => {
  const tmpDir = await getTmpDir({ scheme: 'file' })
  // @ts-ignore
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
  // @ts-ignore
  const testPath = await RendererWorker.invoke('PlatformPaths.getTestPath')
  const absolutePath = testPath + PathSeparatorType.Slash + uri
  // @ts-ignore
  const content = await RendererWorker.invoke('Ajax.getText', absolutePath)
  return createExecutable(content)
}

export const createDroppedFileHandle = async (): Promise<DroppedFileHandle> => {
  const directory = await navigator.storage.getDirectory()
  const fileHandle = await directory.getFileHandle('dropped-file.txt', {
    create: true,
  })
  const file = await fileHandle.getFile()
  // @ts-ignore
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
