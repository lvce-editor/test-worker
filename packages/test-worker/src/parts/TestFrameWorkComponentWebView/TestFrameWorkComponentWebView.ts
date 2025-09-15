import { createLocator } from '../CreateLocator/CreateLocator.ts'
import * as CreatePortRpc from '../CreatePortRpc/CreatePortRpc.ts'
import * as WebViewState from '../WebViewState/WebViewState.ts'

export const fromId = async (webViewId: string): Promise<any> => {
  const rpc = await CreatePortRpc.createPortRpc(webViewId)
  WebViewState.set(webViewId, rpc)
  return {
    locator(selector: string, options: any): any {
      const baseLocator = createLocator(selector, options)
      // @ts-ignore
      baseLocator.webViewId = webViewId
      return baseLocator
    },
  }
}
