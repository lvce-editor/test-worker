import { RendererWorker } from '@lvce-editor/rpc-registry'

export const hotReloadEnabled = async (): Promise<boolean> => {
  const preference = await RendererWorker.getPreference('E2eTest.hotReload')
  return Boolean(preference)
}
