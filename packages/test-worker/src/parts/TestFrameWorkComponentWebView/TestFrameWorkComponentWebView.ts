import { createLocator } from '../CreateLocator/CreateLocator.ts'
import * as CreatePortIpc from '../CreatePortIpc/CreatePortIpc.ts'
import * as WebViewState from '../WebViewState/WebViewState.ts'

export const fromId = async (webViewId: string): Promise<any> => {
  const rpc = await CreatePortIpc.createPortIpc(webViewId)
  WebViewState.set(webViewId, rpc)
  return {
    locator(selector: string, options: any): any {
      const baseLocator = createLocator(selector, options)
      baseLocator.webViewId = webViewId
      return baseLocator
    },
  }
}
