import { RendererWorker } from '@lvce-editor/rpc-registry'
import { AssertionError } from '../AssertionError/AssertionError.ts'

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

export const getComponent = async (moduleId: string): Promise<ComponentInfo> => {
  const components = await getComponents()
  const component = components.find((item) => item.moduleId === moduleId)
  if (!component) {
    throw new AssertionError(`Expected component ${moduleId} to exist but found ${JSON.stringify(components)}`)
  }
  return component
}

export const handlePointerDown = async (button: number, componentUid: number): Promise<void> => {
  const { uid } = await getComponent('ComponentState')
  await RendererWorker.invoke('Viewlet.executeViewletCommand', uid, 'handlePointerDown', button, String(componentUid))
}
