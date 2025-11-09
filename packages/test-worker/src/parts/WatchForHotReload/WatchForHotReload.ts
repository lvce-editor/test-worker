import { PlatformType, RpcId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getFileUri } from '../GetFileUri/GetFileUri.ts'

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
