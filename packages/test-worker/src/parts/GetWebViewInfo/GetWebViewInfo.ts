import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getWebViewInfo = async (webViewId: string): Promise<any> => {
  const info = await RendererWorker.invoke('WebView.getWebViewInfo2', webViewId)
  return info
}
