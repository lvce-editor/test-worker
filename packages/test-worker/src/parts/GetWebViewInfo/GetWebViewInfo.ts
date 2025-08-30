import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'

export const getWebViewInfo = async (webViewId: string): Promise<any> => {
  const info = await ParentRpc.invoke('WebView.getWebViewInfo2', webViewId)
  return info
}
