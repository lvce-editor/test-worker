import { RendererWorker } from '@lvce-editor/rpc-registry'

export interface ComponentInfo {
  readonly editable: boolean
  readonly moduleId: string
  readonly uid: number
}

export const getComponents = async (): Promise<readonly ComponentInfo[]> => {
  return RendererWorker.invoke('ComponentState.getComponents')
}

export const getState = async <T = unknown>(uid: number): Promise<T> => {
  return RendererWorker.invoke('ComponentState.getState', uid)
}

export const setState = async (uid: number, state: object): Promise<void> => {
  return RendererWorker.invoke('ComponentState.setState', uid, state)
}
