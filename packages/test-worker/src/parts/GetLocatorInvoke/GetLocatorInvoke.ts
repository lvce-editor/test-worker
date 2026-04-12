import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ILocator } from '../ILocator/ILocator.ts'
import * as WebViewState from '../WebViewState/WebViewState.ts'

interface Invoke {
  (method: string, ...params: readonly any[]): Promise<any>
}

export const getLocatorInvoke = (locator: ILocator): Invoke => {
  // @ts-ignore
  if (locator.webViewId) {
    // @ts-ignore
    const module = WebViewState.get(locator.webViewId)
    return module.invoke
  }

  return RendererWorker.invoke
}
