import { RendererWorker } from '@lvce-editor/rpc-registry'

export const setWebViewPort = async (uid: number, port: MessagePort, origin: string, portType: string): Promise<void> => {
  await RendererWorker.invokeAndTransfer('WebView.setPort', uid, port, origin, portType)
}
