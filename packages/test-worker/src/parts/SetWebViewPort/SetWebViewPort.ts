import * as ParentRpc from '../RendererWorker/RendererWorker.ts'

export const setWebViewPort = async (uid: number, port: MessagePort, origin: string, portType: string): Promise<void> => {
  await ParentRpc.invokeAndTransfer('WebView.setPort', uid, port, origin, portType)
}
