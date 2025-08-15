import * as RendererWorker from '../RendererWorker/RendererWorker.ts'
import * as WebViewState from '../WebViewState/WebViewState.ts'

export const getLocatorInvoke = (locator: any): any => {
  if (locator.webViewId) {
    const module = WebViewState.get(locator.webViewId)
    return module.invoke
  }
  return RendererWorker.invoke
}
