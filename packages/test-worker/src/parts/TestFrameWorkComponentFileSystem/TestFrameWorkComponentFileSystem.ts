import * as FileSystemProtocol from '../FileSystemProtocol/FileSystemProtocol.ts'
import * as PathSeparatorType from '../PathSeparatorType/PathSeparatorType.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'
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

export const mkdir = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('FileSystem.mkdir', uri)
}

export const remove = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('FileSystem.remove', uri)
}

export const getTmpDir = async ({ scheme = FileSystemProtocol.Memfs }: { readonly scheme?: string } = {}): Promise<string> => {
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
