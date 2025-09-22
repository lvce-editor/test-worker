import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { FileMap } from '../FileMap/FileMap.ts'

export const loadFixtureToMemFs = async (fileMap: FileMap): Promise<string> => {
  for (const [path, content] of Object.entries(fileMap)) {
    const memfsPath = `memfs:///fixture/${path}`
    await RendererWorker.invoke('FileSystem.writeFile', memfsPath, content)
  }
  return `memfs:///fixture`
}
