import * as ParentRpc from '../RendererWorker/RendererWorker.ts'

export const getWebViewInfo = async (webViewId: string): Promise<any> => {
  const info = await ParentRpc.invoke('WebView.getWebViewInfo2', webViewId)
  return info
}
