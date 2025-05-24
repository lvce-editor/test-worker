import * as Rpc from '../RendererWorker/RendererWorker.ts'
import * as WebViewState from '../WebViewState/WebViewState.ts'

export const getLocatorRpc = (locator: any): any => {
  if (locator.webViewId) {
    return WebViewState.get(locator.webViewId)
  }
  return Rpc
}
