import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'

export const setWebViewPort = async (uid: number, port: MessagePort, origin: string, portType: string): Promise<void> => {
  await ParentRpc.invokeAndTransfer('WebView.setPort', uid, port, origin, portType)
}
