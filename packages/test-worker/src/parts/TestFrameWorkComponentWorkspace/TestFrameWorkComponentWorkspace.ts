import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const setPath = async (path: string): Promise<void> => {
  await Rpc.invoke('Workspace.setPath', path)
}
