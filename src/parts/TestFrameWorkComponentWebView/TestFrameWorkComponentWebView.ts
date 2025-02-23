import * as CreatePortIpc from '../CreatePortIpc/CreatePortIpc.ts'
import * as Locator from '../Locator/Locator.ts'
import * as WebViewState from '../WebViewState/WebViewState.ts'

export const fromId = async (webViewId: string): Promise<any> => {
  const rpc = await CreatePortIpc.createPortIpc(webViewId)
  WebViewState.set(webViewId, rpc)
  return {
    locator(selector: string, options: any): any {
      const baseLocator = Locator.create(selector, options)
      baseLocator.webViewId = webViewId
      return baseLocator
    },
  }
}
