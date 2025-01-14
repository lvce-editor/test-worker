import * as CreatePortIpc from '../CreatePortIpc/CreatePortIpc.ts'
import * as Expect from '../Expect/Expect.ts'
import * as JsonRpc from '../JsonRpc/JsonRpc.ts'
import * as Locator from '../Locator/Locator.ts'

export const fromId = async (webViewId: string): Promise<any> => {
  const ipc = await CreatePortIpc.createPortIpc(webViewId)
  const webViewRpc = {
    invoke(method: string, ...params: readonly any[]): Promise<any> {
      return JsonRpc.invoke(ipc, method, ...params)
    },
  }
  return {
    locator(selector: string, options: any): any {
      const baseLocator = Locator.create(selector, options)
      baseLocator.webView = webViewRpc
      return baseLocator
    },
    expect: Expect.expect,
  }
}
