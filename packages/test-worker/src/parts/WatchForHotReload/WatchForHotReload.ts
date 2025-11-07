import { PlatformType, RpcId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'

const getFileUri = (href: string): string => {
  const rest = href.slice('/remote'.length)
  const fileUrl = `file://${rest}`
  return fileUrl
}

export const watchForHotReload = async (platform: number, href: string): Promise<void> => {
  if (platform !== PlatformType.Remote) {
    return
  }
  if (!href.startsWith('/remote')) {
    return
  }
  const fileUrl = getFileUri(href)
  const callbackCommand = 'FileWatcher.handleEvent'
  // @ts-ignore
  await RendererWorker.invoke('FileWatcher.watchFile', RpcId.TestWorker, callbackCommand, fileUrl)
}
