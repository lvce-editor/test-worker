import * as FileSystemProtocol from '../FileSystemProtocol/FileSystemProtocol.ts'
import * as PathSeparatorType from '../PathSeparatorType/PathSeparatorType.ts'
import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const writeFile = async (path: string, content: string): Promise<void> => {
  await Rpc.invoke('FileSystem.writeFile', path, content)
}

export const mkdir = async (path: string): Promise<void> => {
  await Rpc.invoke('FileSystem.mkdir', path)
}

export const remove = async (uri: string): Promise<void> => {
  await Rpc.invoke('FileSystem.remove', uri)
}

export const getTmpDir = async ({ scheme = FileSystemProtocol.Memfs }: { readonly scheme?: string } = {}): Promise<string> => {
  switch (scheme) {
    case FileSystemProtocol.Memfs:
      return 'memfs:///workspace'
    default:
      // @ts-ignore
      return Rpc.invoke('PlatformPaths.getTmpDir')
  }
}

export const chmod = async (uri: string, permissions: any): Promise<void> => {
  // @ts-ignore
  await Rpc.invoke('FileSystem.chmod', uri, permissions)
}

export const createExecutable = async (content: string): Promise<string> => {
  const tmpDir = await getTmpDir({ scheme: 'file' })
  // @ts-ignore
  const nodePath = await Rpc.invoke('PlatformPaths.getNodePath')
  const gitPath = `${tmpDir}/git`
  await writeFile(
    gitPath,
    `#!${nodePath}
  ${content}`,
  )
  await chmod(gitPath, '755')
  return gitPath
}

export const createExecutableFrom = async (path: string): Promise<string> => {
  // @ts-ignore
  const testPath = await Rpc.invoke('PlatformPaths.getTestPath')
  const absolutePath = testPath + PathSeparatorType.Slash + path
  // @ts-ignore
  const content = await Rpc.invoke('Ajax.getText', absolutePath)
  return createExecutable(content)
}
