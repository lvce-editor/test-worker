import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as WebViewState from '../WebViewState/WebViewState.ts'

interface Invoke {
  (method: string, ...params: readonly any[]): Promise<any>
}

export const getLocatorInvoke = (locator: any): Invoke => {
  if (locator.webViewId) {
    const module = WebViewState.get(locator.webViewId)
    return module.invoke
  }
  // @ts-ignore
  return RendererWorker.invoke
}
