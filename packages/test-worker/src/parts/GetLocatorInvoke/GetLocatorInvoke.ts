import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as WebViewState from '../WebViewState/WebViewState.ts'

export const getLocatorInvoke = (locator: any): any => {
  if (locator.webViewId) {
    const module = WebViewState.get(locator.webViewId)
    return module.invoke
  }
  return RendererWorker.invoke
}
