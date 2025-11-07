import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const watchForHotReload = async (platform: number, href: string): Promise<void> => {
  if (platform !== PlatformType.Remote) {
    return
  }
  if (!href.startsWith('/remote')) {
    return
  }
  const rest = href.slice('/remote'.length)
  const fileUrl = `file://${rest}`
  const id = Math.random()
  // @ts-ignore
  await RendererWorker.invoke('FileWatcher.watchFile', id, fileUrl)
}
