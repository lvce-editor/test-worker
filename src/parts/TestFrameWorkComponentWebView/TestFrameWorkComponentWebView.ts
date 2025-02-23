import * as CreatePortIpc from '../CreatePortIpc/CreatePortIpc.ts'
import * as JsonRpc from '../JsonRpc/JsonRpc.ts'
import * as Locator from '../Locator/Locator.ts'
import * as WebViewState from '../WebViewState/WebViewState.ts'

export const fromId = async (webViewId: string): Promise<any> => {
  const ipc = await CreatePortIpc.createPortIpc(webViewId)
  const webViewRpc = {
    invoke(method: string, ...params: readonly any[]): Promise<any> {
      return JsonRpc.invoke(ipc, method, ...params)
    },
  }
  WebViewState.set(webViewId, webViewRpc)
  return {
    locator(selector: string, options: any): any {
      const baseLocator = Locator.create(selector, options)
      baseLocator.webViewId = webViewId
      return baseLocator
    },
  }
}
