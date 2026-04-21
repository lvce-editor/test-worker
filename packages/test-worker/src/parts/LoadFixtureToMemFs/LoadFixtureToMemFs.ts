import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { FileMap } from '../FileMap/FileMap.ts'

export const loadFixtureToMemFs = async (fileMap: FileMap): Promise<string> => {
  await Promise.all(
    Object.entries(fileMap).map((entry: readonly [string, string]) => {
      const [path, content] = entry
      const memfsPath = `memfs:///fixture/${path}`
      return RendererWorker.invoke('FileSystem.writeFile', memfsPath, content)
    }),
  )
  return `memfs:///fixture`
}
